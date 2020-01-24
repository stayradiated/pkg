import readPkgUp from 'read-pkg-up'

const { packageJson: pkg } = readPkgUp.sync()

export const SRC_PATH = pkg.srcPath || 'src'
export const DIST_PATH = pkg.distPath || 'dist'
export const DOCS_PATH = pkg.docsPath || 'docs'
export const DOCS_EXTERNAL = pkg.docsExternal || []
export const TESTS_NAME = pkg.testsPath || '**/*.spec.{j,t}s'
