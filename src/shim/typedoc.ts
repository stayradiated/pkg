import mockTSConfig from './mock-tsconfig'
import { TESTS_NAME } from '../shared/constants'

const typedoc = (srcDir: string, outDir: string) => {
  mockTSConfig('typedoc')

  const TypeDoc = require('typedoc')
  const app = new TypeDoc.Application()

  app.options.addReader(new TypeDoc.TSConfigReader())
  app.bootstrap({
    mode: 'modules',
    exclude: TESTS_NAME,
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
  })

  const project = app.convert(app.expandInputFiles([srcDir]))

  app.generateDocs(project, outDir)
}

export default typedoc
