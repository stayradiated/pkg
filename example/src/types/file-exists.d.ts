declare module 'file-exists' {
  export default function(filename: string): Promise<boolean>
}
