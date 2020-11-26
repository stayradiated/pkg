import globby from 'globby'
import { join } from 'path'
import pkgConf from 'pkg-conf'
import deepExtend from 'deep-extend'

import { SRC_PATH, DIST_PATH } from '../shared/constants'

const D_TS_PATH = join(SRC_PATH, 'types')
const D_TS_GLOB = `./**/*.d.ts`

const createTSConfig = (): string => {
  const declarationFiles = globby.sync(D_TS_GLOB, { cwd: D_TS_PATH })

  const paths: Record<string, string[]> = {
    '*': ['node_modules/*', `${D_TS_PATH}/*`],
  }

  for (const filepath of declarationFiles) {
    const moduleName = filepath.replace(/\.d\.ts$/, '')
    paths[moduleName] = [join(D_TS_PATH, filepath)]
  }

  const userConfig = pkgConf.sync('pkg')

  const config = deepExtend({
    compilerOptions: {
      baseUrl: '.',
      declaration: true,
      diagnostics: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      incremental: true,
      module: 'commonjs',
      moduleResolution: 'node',
      noImplicitAny: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      outDir: DIST_PATH,
      paths,
      removeComments: true,
      resolveJsonModule: true,
      sourceMap: true,
      strict: false, // we should turn this on when data is ready :/
      target: 'es2018',
      lib: ['es2019', 'DOM', 'DOM.Iterable'],
    },
    include: [`${SRC_PATH}/**/*`],
  }, userConfig.tsconfig)

  const configString = JSON.stringify(config, null, 2)

  return configString
}

export default createTSConfig
