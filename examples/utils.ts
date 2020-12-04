export async function performSearch<T = any>(
  title: string,
  search: (opts: T) => any,
  params: T
): Promise<any> {
  try {
    const results = await search(params)

    console.log('\n####################')
    console.log(title)

    return results
  } catch (error) {
    console.log(title + ' Error', error)
  }
}
