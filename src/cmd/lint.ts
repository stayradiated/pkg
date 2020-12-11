import execLinter from '../shared/execLinter'

const LINTER_PATH = require.resolve('../shim/eslint-tsc')

const lint = async (): Promise<void> => {
  const args = process.argv.slice(2)
  await execLinter(LINTER_PATH, args)
}

export default lint
