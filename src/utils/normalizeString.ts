function normalizeString (value: string | number = ''): string {
  const normalizedValue: string = String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return normalizedValue
}

export default normalizeString
