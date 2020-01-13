import { SRC_PATH, DOCS_PATH } from '../shared/constants'
import { log, fmt } from '../shared/log'

import typedoc from '../shim/typedoc'

const build = async () => {
  log(fmt`Building docs from ${SRC_PATH} to ${DOCS_PATH} directory`)

  log(fmt`Running ${'typedoc'}`)
  await typedoc(SRC_PATH, DOCS_PATH)
}

export default build
