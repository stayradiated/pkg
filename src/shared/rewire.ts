import { resolveModulePath } from 'unwire'

const Module = require('module')

const REWIRE_FINDPATH = new Map()
const findPath = Module._findPath
Module._findPath = (...args: string[]) => {
  const [path] = args
  if (REWIRE_FINDPATH.has(path)) {
    return REWIRE_FINDPATH.get(path)
  }
  return findPath.apply(Module, args)
}

const REWIRE_LOAD = new Map()
const load = Module._load
Module._load = (...args: string[]) => {
  const [path] = args
  if (REWIRE_LOAD.has(path)) {
    return REWIRE_LOAD.get(path)
  }
  return load.apply(Module, args)
}

type PathTree = [string, PathTreeArray]
type PathTreeArray = Array<string | PathTree>

const rewireChildren = (
  context: string,
  parent: string,
  children: PathTreeArray,
) => {
  const parentPath = resolveModulePath(parent, context)

  children.forEach((child) => {
    if (Array.isArray(child)) {
      const [parent, children] = child
      return rewireChildren(parentPath, parent, children)
    }

    const childPath = resolveModulePath(child, parentPath)

    const childModule = require(childPath)

    REWIRE_FINDPATH.set(child, childPath)
    REWIRE_LOAD.set(child, childModule)
  })
}

const rewire = (dependencyTree: PathTree[]) => {
  dependencyTree.forEach((item) => {
    const [parent, children] = item
    rewireChildren(__dirname, parent, children)
  })
}

export default rewire
