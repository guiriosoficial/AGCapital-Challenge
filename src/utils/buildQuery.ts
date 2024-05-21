const buildQuery = (query: Record<string, any>): string => {
  return Object.keys(query)
    .map((key: string) => {
      const value: string = query[key]
      return value ? `${key}=${value}` : undefined
    })
    .join('&')
}
// const buildQuery = (query: Record<string, any>): string => {
//   const params = new URLSearchParams(query)
//   return String(params)
// }

export default buildQuery
