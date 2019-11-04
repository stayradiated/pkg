import { join, dirname, resolve } from 'path'
import { mockWithContext } from 'unwire'

import { SRC_PATH } from '../shared/constants'
import createTSConfig from '../config/tsconfig'

const TSCONFIG_PATH = join(dirname(resolve(SRC_PATH)), 'tsconfig.json')

const MOCK_FILE = {
  isFile: () => true,
  isDirectory: () => false,
}

const start = async () => {
  mockWithContext('fs', require.resolve('typescript'), (fs) => ({
    ...fs,
    statSync: (path: string, options: object) => {
      if (path === TSCONFIG_PATH) {
        return MOCK_FILE
      }
      return fs.statSync(path, options)
    },
    readFileSync: (path: string, options: object) => {
      if (path === TSCONFIG_PATH) {
        const configString = createTSConfig()
        const configBuffer = Buffer.from(configString, 'utf8')
        return configBuffer
      }
      return fs.readFileSync(path, options)
    },
  }))

  return require('typescript/lib/tsc')
}

start()
