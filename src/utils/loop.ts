export function loop<T>(count: number, fn: (index: number) => T): T[] {
  const results: T[] = [];
  for (let i = 0; i < count; i++) {
    results.push(fn(i));
  }
  return results;
}
