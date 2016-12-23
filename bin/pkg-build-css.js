#!/usr/bin/env node

const path = require('path')
const postcss = require('postcss')
const promisify = require('es6-promisify')
const readDir = promisify(require('recursive-readdir-filter'))
const readFile = promisify(require('fs').readFile)
const writeFile = promisify(require('fs').writeFile)

const SRC_PATH = process.env.npm_package_srcPath
const MODULE_PATH = 'css.json'

function processCSS (input, from) {
  return postcss([
    require('postcss-nested'),
    require('postcss-advanced-variables')(),
    require('postcss-math'),
    require('postcss-round-subpixels'),
    require('postcss-assets')({
      loadPaths: ['assets/'],
    }),
  ])
    .process(input, {from})
    .then((result) => result.css)
}

if (SRC_PATH == null) {
  console.error('srcPath is not set in package.json')
  return
}

// Find all css files in source directory
readDir(SRC_PATH, {filterFile: (stats) => stats.name.match(/\.css$/)})
  .then((files) => Promise.all(
    files.map((fp) => {
      const result = {path: path.resolve(fp)}

      // Read file contents
      return readFile(fp)
        // Run through PostCSS
        .then((input) => processCSS(input.toString(), fp))
        // Save filename and result into object
        .then((output) => {
          result.content = output
          return result
        })
    })))
  .then((files) => {
    // Combine all files into a single object
    const data = files.reduce((result, file) => {
      result[file.path] = file.content
      return result
    }, {})

    // Write object into css-modules.json
    return writeFile(MODULE_PATH, JSON.stringify(data))
  })
  .catch((err) => console.error(err))
