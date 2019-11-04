import { mockWithContext } from 'unwire'
import * as pkgConf from 'pkg-conf'

import { SRC_PATH } from '../shared/constants'

import getAVAConfig from '../config/ava-tsc'

console.log('Using AVA with ts-node')

const start = async () => {
  const avaConfig = await getAVAConfig()

  mockWithContext('pkg-conf', require.resolve('ava/cli'), () => ({
    sync: (pkgName: string, opts: object) => {
      if (pkgName === 'ava') {
        return avaConfig
      }
      return pkgConf.sync(pkgName, opts)
    },
    filepath: () => SRC_PATH,
  }))

  return require('ava/cli')
}

start().catch(console.error)
