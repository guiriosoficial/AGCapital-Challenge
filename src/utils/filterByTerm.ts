import normalizeString from './normalizeString'

function filterByTerm<T> (
  array: T[] = [],
  term: string = '',
  keys: (keyof T)[] | keyof T = []
): T[] {
  const normalizedTerm: string = normalizeString(term)

  return array.filter((item) => {
    const keysList = Array.isArray(keys) ? keys : [keys]

    if (keysList.length > 0) {
      return keysList.some((key) => {
        const value = item[key]
        if (value == null) return false
        return normalizeString(String(value)).includes(normalizedTerm)
      })
    }

    return normalizeString(String(item)).includes(normalizedTerm)
  })
}

export default filterByTerm
