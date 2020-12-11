import { resolveModulePath } from 'unwire'
import NodeJSModule from 'module'

const Module = NodeJSModule as typeof NodeJSModule & {
  _findPath: (
    request: string,
    paths: string[],
    isMain: boolean,
  ) => string | boolean,
  _load: (request: string, parent: string, isMain: boolean) => any,
}

const REWIRE_FINDPATH = new Map()
const findPath = Module._findPath
Module._findPath = (request, paths, isMain) => {
  if (REWIRE_FINDPATH.has(request)) {
    return REWIRE_FINDPATH.get(request)
  }
  return findPath.call(Module, request, paths, isMain)
}

const REWIRE_LOAD = new Map()
const load = Module._load
Module._load = (request, parent, isMain) => {
  if (REWIRE_LOAD.has(request)) {
    return REWIRE_LOAD.get(request)
  }
  return load.call(Module, request, parent, isMain)
}

// eslint-disable-next-line no-use-before-define
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

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const childModule = require(childPath)

    REWIRE_FINDPATH.set(child, childPath)
    REWIRE_LOAD.set(child, childModule)
  })
}

const rewire = (dependencyTree: PathTree[]): void => {
  dependencyTree.forEach((item) => {
    const [parent, children] = item
    rewireChildren(__dirname, parent, children)
  })
}

export default rewire
