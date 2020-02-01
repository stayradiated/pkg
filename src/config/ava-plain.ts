import { TESTS_NAME } from '../shared/constants'

const getConfig = async () => {
  return {
    verbose: true,
    files: [TESTS_NAME],
  }
}

export default getConfig
