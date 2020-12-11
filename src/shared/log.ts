import chalk from 'chalk'

import { SRC_PATH, DIST_PATH } from './constants'

const log = (...args: string[]): void => console.log(...args)

const fmt = (
  strings: TemplateStringsArray,
  ...values: (string | string[])[]
): string => {
  const message = strings.reduce((total, current, index) => {
    total += current
    if (Object.hasOwnProperty.call(values, index)) {
      let value = values[index]

      if (Array.isArray(value)) {
        value = value.join(' ')
      }

      switch (value) {
        case SRC_PATH:
          total += chalk.blue(value)
          break

        case DIST_PATH:
          total += chalk.yellow(value)
          break

        default:
          total += chalk.green(value)
          break
      }
    }
    return total
  }, '')

  return chalk.whiteBright(message)
}

export { log, fmt }
