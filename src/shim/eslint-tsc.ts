import { resolveModulePath } from 'unwire'

import rewire from '../shared/rewire'

// This is where the magic happens! rewire() will go through these dependencies
// and make sure they are all available from the current directory
rewire([
  [
    '@mishguru/eslint-typescript-config',
    [
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-standard',
      'eslint-config-standard-jsx',
      'eslint-plugin-ava',
      'eslint-plugin-import',
      'eslint-plugin-mishguru',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-react',
      'eslint-plugin-standard',
      'typescript',
      ['eslint-plugin-import', ['eslint-import-resolver-node']],
    ],
  ],
])

const start = async () => {
  process.argv.push(
    '--config',
    require.resolve('@mishguru/eslint-typescript-config'),
  )
  const ESLINT = resolveModulePath(
    'eslint/bin/eslint',
    require.resolve('eslint'),
  )
  return require(ESLINT)
}

start()
