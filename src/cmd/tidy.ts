import { SRC_PATH } from '../shared/constants'
import exec from '../shared/exec'
import { log, fmt } from '../shared/log'
import execLinter from '../shared/execLinter'

import config from '../config/prettier'

const PRETTIER_PATH = require.resolve('prettier/bin-prettier')
const LINTER_PATH = require.resolve('../shim/eslint-tsc')

const prettier = async () => {
  const args = process.argv.slice(2)
  log(fmt`Running ${'prettier'} ${args}`)

  const files =
    args.length > 0
      ? args
      : [`./${SRC_PATH}/**/*.{js,jsx,css,scss,ts,tsx,md,yml,json,less}`]

  await exec('node', PRETTIER_PATH, ...config, ...files)

  await execLinter(LINTER_PATH, ['--fix'])
}

export default prettier
