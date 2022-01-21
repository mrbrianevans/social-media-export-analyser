export function normalisePath(path: string) {
  // replace seperators
  path = path.replace(/\\+/g, '/')
  path = path.startsWith('/') ? path.slice(1) : path
  return path
}

export function onlyFilename(path: string) {
  const normalPath = normalisePath(path)
  return normalPath.split('/').slice(-1)[0] // .at(-1) not yet available
}
