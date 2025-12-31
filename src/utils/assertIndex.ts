function assertIndex (index: number, error: string): number {
  if (index === -1) throw new Error(error)

  return index
}

export default assertIndex
