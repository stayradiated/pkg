import { mockWithContext } from 'unwire'
import * as pkgConf from 'pkg-conf'
import { Config } from 'pkg-conf'
import readPkgUp from 'read-pkg-up'

import getConfig from '../config/ava-plain'

const start = async () => {
  const config = await getConfig()
  const filepath = readPkgUp.sync().path

  mockWithContext('pkg-conf', require.resolve('ava/cli'), () => ({
    sync: (pkgName: string, opts: Record<string, unknown>) => {
      if (pkgName === 'ava') {
        return config
      }
      return pkgConf.sync(pkgName, opts)
    },
    filepath: (c: Config) => {
      if (c === config) {
        return filepath
      }
      return pkgConf.filepath(c)
    },
  }))

  return require('ava/cli')
}

start().catch(console.error)
