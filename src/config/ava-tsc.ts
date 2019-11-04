import globby from 'globby'
import { resolve } from 'path'

import { SRC_PATH, TESTS_NAME, DIST_PATH } from '../shared/constants'

const TS_NODE_PATH = require.resolve('../shim/ts-node')

const getConfig = async () => {
  const files = await globby(TESTS_NAME, { cwd: SRC_PATH })
  const relativeFiles = files.map((file) => resolve(SRC_PATH, file))

  return {
    verbose: true,
    require: [TS_NODE_PATH],
    compileEnhancements: false,
    extensions: ['ts'],
    files: [...relativeFiles, `!${DIST_PATH}/`],
  }
}

export default getConfig
