function assertExists<T> (value: T | undefined, error: string): T {
  if (!value) throw new Error(error)

  return value
}

export default assertExists
