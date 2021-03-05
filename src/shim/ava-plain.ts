import { mockWithContext } from 'unwire'
import * as pkgConf from 'pkg-conf'
import { Config } from 'pkg-conf'
import readPkgUp from 'read-pkg-up'

import getConfig from '../config/ava-plain'

const start = async () => {
  const config = await getConfig()
  const filepath = readPkgUp.sync().path

  const mockedPkgConf = async (
    pkgName: string,
    opts: Record<string, unknown>,
  ) => {
    return mockedPkgConf.sync(pkgName, opts)
  }

  mockedPkgConf.sync = (pkgName: string, opts: Record<string, unknown>) => {
    if (pkgName === 'ava') {
      return config
    }
    return pkgConf.sync(pkgName, opts)
  }

  mockedPkgConf.filepath = (c: Config) => {
    if (c === config) {
      return filepath
    }
    return pkgConf.filepath(c)
  }

  mockWithContext('pkg-conf', require.resolve('ava/cli'), () => mockedPkgConf)

  return require('ava/cli')
}

start().catch(console.error)
