#!/usr/bin/env node

const fs = require('fs')
const {join, dirname} = require('path')
const Promise = require('bluebird')
const childProcess = require('child-process-promise')

Promise.promisifyAll(fs)

const NCU = './node_modules/.bin/ncu'

function exec (cmd, options) {
  // console.log(cmd, options)
  return Promise.resolve(childProcess.exec(cmd, options))
}

// get details about a package.json
function readPackage (path) {
  return fs.readFileAsync(path).then((data) => {
    const pkg = JSON.parse(data)
    // so we don't lose track of where this package is
    pkg.path = path
    pkg.dir = dirname(path)
    return pkg
  })
}

// is this path a directory
function isDirectory (dir) {
  return fs.statAsync(dir).then((stats) => stats.isDirectory())
}

// does this path have an accessible package.json?
function isPackage (path) {
  return fs.accessAsync(path).return(true).catchReturn(false)
}

function isPackageDependent (name, pkg) {
  const deps = []
    .concat(Object.keys(pkg.dependencies || {}))
    .concat(Object.keys(pkg.devDependencies || {}))
  return deps.includes(name)
}

// find sibling packages
function findPackages (pkgName) {
  return fs.readdirAsync('../')
    .map((name) => join('..', name))
    .filter(isDirectory)
    .map((dir) => join(dir, 'package.json'))
    .filter(isPackage)
    .map(readPackage)
    .filter((pkg) => isPackageDependent(pkgName, pkg))
}

// is git clean
function isClean (cwd) {
  return exec('git status --porcelain', {cwd})
    .then((result) => result.stdout.length === 0)
    .catchReturn(false)
}

// update package
function updatePackage (pkg, src) {
  console.log(`Updating ${src.name} in package ${pkg.dir}`)
  return exec(`${NCU} --packageFile ${pkg.path} -a -f ${src.name}`)
}

// stage package.json
function gitAdd (pkg) {
  console.log(`Staging ${pkg.name}`)
  return exec('git add ./package.json', {cwd: pkg.dir})
    .catchReturn(true)
}

// commit change
function gitCommit (pkg, src) {
  console.log(`Commiting ${pkg.name}`)
  const message = `Updated ${src.name} to version ${src.version}`
  return exec(`git commit -m "${message}"`, {cwd: pkg.dir})
    .catchReturn(true)
}

// pull commits
function gitPull (pkg) {
  console.log(`Pulling ${pkg.name}`)
  return exec('git pull', {cwd: pkg.dir})
}

// push commits
function gitPush (pkg) {
  console.log(`Pushing ${pkg.name}`)
  return exec('git push', {cwd: pkg.dir})
}

// install depedencies
function npmInstall (pkg) {
  console.log(`Installing dependencies for ${pkg.name}`)
  return exec('npm --cache-min 99999999 install', {cwd: pkg.dir})
}

// patch version number (0.0.x)
function npmPatch (pkg) {
  console.log(`Bumping version for ${pkg.name}`)
  return exec('npm version patch', {cwd: pkg.dir})
}

// publish to npm
function npmPublish (pkg) {
  console.log(`Publishing ${pkg.name}`)
  return exec('npm publish', {cwd: pkg.dir})
}

readPackage('./package.json')
.then((src) => {
  console.log(src.name)

  return findPackages(src.name)
    .filter((pkg) => isClean(pkg.dir))
    .map((pkg) => Promise.resolve()

      // modify package
      .then(() => gitPull(pkg))
      .then(() => updatePackage(pkg, src))

      // break chain if package hasn't changed
      .then(() => isClean(pkg.dir))
      .then((clean) => {
        if (clean) {
          throw new Error(`!!! ${pkg.name} is already up to date`)
        }
      })

      // install new dependencies
      .then(() => npmInstall(pkg))

      // update git and npm
      .then(() => gitAdd(pkg))
      .then(() => gitCommit(pkg, src))
      .then(() => npmPatch(pkg))
      .then(() => npmPublish(pkg))
      .then(() => gitPush(pkg))

      // catch errors
      .catch((error) => {
        console.warn(error.message)
      })
    )
})
