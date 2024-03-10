export function exclude<T, Key extends keyof T>(
  data: T,
  keys: Key[]
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(data as any).filter(([key]) => !keys.includes(key as any))
  ) as T
}