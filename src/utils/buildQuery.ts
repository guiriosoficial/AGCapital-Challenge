const buildQuery = (query: Record<string, unknown>): string => {
  const params = new URLSearchParams(query as Record<string, string>)
  return String(params)
}

export default buildQuery
