import { mockWithContext } from 'unwire'
import * as pkgConf from 'pkg-conf'

import { SRC_PATH } from '../shared/constants'

import getConfig from '../config/ava-plain'

const start = async () => {
  const config = await getConfig()
  mockWithContext('pkg-conf', require.resolve('ava/cli'), () => ({
    sync: (pkgName: string, opts: object) => {
      if (pkgName === 'ava') {
        return config
      }
      return pkgConf.sync(pkgName, opts)
    },
    filepath: () => SRC_PATH,
  }))

  return require('ava/cli')
}

start().catch(console.error)
