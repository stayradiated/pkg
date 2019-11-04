import readPkgUp from 'read-pkg-up'

const { package: pkg } = readPkgUp.sync()

export const SRC_PATH = pkg.srcPath || 'src'
export const DIST_PATH = pkg.distPath || 'dist'
export const TESTS_NAME = pkg.testsPath || '**/*.spec.*'
