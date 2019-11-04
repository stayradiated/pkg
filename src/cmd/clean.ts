import { log, fmt } from '../shared/log'
import exec from '../shared/exec'
import { DIST_PATH } from '../shared/constants'

const clean = async () => {
  log(fmt`Cleaning ${DIST_PATH} directory`)
  await exec('rm', '-rf', DIST_PATH)
  await exec('mkdir', '-p', DIST_PATH)
}

export default clean
