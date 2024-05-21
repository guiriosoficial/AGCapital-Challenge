import normalizeString from './normalizeString'

function filterByTerm (
  array: any[] = [],
  term: string = '',
  keys: string[] | string = ''
): any[] {
  const normalizedTerm: string = normalizeString(term)

  return array?.filter((i) => {
    if (keys.length > 0) {
      const keysList: string[] =
        !Array.isArray(keys)
          ? [keys]
          : keys

      return keysList.some((key) => {
        return normalizeString(i[key]).includes(normalizedTerm)
      })
    } else {
      return normalizeString(i).includes(normalizedTerm)
    }
  })
}

export default filterByTerm
