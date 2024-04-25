export function parseURI(uri: string): string {
  const matchResult = uri.match(/#([^#]*)$/)
  if (matchResult) {
    return matchResult[1]
  }
  return ''
}
