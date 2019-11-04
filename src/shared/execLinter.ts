import { SRC_PATH } from '../shared/constants'
import exec from '../shared/exec'
import { log, fmt } from '../shared/log'

const execLinter = async (linterPath: string, args: string[]) => {
  log(fmt`Running ${'eslint'} ${args}`)

  const options = args.filter((input) => input.startsWith('--'))
  if (options.length > 0) {
    const index = args.indexOf(options[0])
    if (index > -1) {
      args.splice(index, options.length)
    }
  }

  const files = args.length === 0 ? [`${SRC_PATH}`] : args
  options.push('--ext', '.jsx', '--ext', '.js', '--ext', '.ts')

  await exec('node', linterPath, ...options, ...files)
}

export default execLinter
