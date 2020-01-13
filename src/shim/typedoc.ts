import mockTSConfig from './mock-tsconfig'

const typedoc = (srcDir: string, outDir: string) => {
  mockTSConfig('typedoc')

  const TypeDoc = require('typedoc')
  const app = new TypeDoc.Application()

  app.options.addReader(new TypeDoc.TSConfigReader())
  app.bootstrap()

  const project = app.convert(app.expandInputFiles([srcDir]))

  app.generateDocs(project, outDir)
}

export default typedoc
