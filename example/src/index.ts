import fileExists from 'file-exists'

export default function () {
  console.log(fileExists('./index.ts'))
}
