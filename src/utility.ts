function truncate (query: string): string {
  const len = query.length
  if (len <= 20) return query
  return `${query.substring(0, 10)}${len}${query.substring(len - 10, len)}`
}

export { truncate }
