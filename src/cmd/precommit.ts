import exec from '../shared/exec'
import { log, fmt } from '../shared/log'

const LINT_STAGED_PATH = require.resolve('lint-staged')
const CONFIG_PATH = require.resolve('../config/lintStaging.js')

const precommit = async (): Promise<void> => {
  const args = process.argv.slice(2)
  log(fmt`Running ${'lint-staging'} ${args}`)
  await exec('node', LINT_STAGED_PATH, '--config', CONFIG_PATH, ...args)
}

export default precommit
