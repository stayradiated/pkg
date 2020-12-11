import mockTSConfig from './mock-tsconfig'
import { TESTS_NAME } from '../shared/constants'

const typedoc = (
  srcDir: string,
  outDir: string,
  externalPattern: string[],
): void => {
  mockTSConfig('typedoc')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const TypeDoc = require('typedoc')
  const app = new TypeDoc.Application()

  app.options.addReader(new TypeDoc.TSConfigReader())
  app.bootstrap({
    mode: 'file',
    exclude: TESTS_NAME,
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
    externalPattern: externalPattern,
    theme: 'minimal',
  })

  const project = app.convert(app.expandInputFiles([srcDir]))

  app.generateDocs(project, outDir)
}

export default typedoc
