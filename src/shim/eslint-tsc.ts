import { resolveModulePath } from 'unwire'

import rewire from '../shared/rewire'

// This is where the magic happens! rewire() will go through these dependencies
// and make sure they are all available from the current directory
rewire([
  [
    'eslint-config-stayradiated',
    [
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-plugin-mishguru',
    ],
  ],
])

const start = async () => {
  const ESLINT = resolveModulePath(
    'eslint/bin/eslint',
    require.resolve('eslint'),
  )
  return require(ESLINT)
}

start()
