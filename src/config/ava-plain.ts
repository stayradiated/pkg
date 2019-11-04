import globby from 'globby'
import { resolve } from 'path'

import { SRC_PATH, DIST_PATH, TESTS_NAME } from '../shared/constants'

const getConfig = async () => {
  const files = await globby(TESTS_NAME, { cwd: DIST_PATH })
  const relativeFiles = files.map((file) => resolve(DIST_PATH, file))

  return {
    verbose: true,
    files: [...relativeFiles, `!${SRC_PATH}/`],
  }
}

export default getConfig
