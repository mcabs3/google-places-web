export async function performSearch<T = any>(title: string, search: (opts: T) => any, params: T) {
  try {
    const results = await search(params);

    console.log("\n####################");
    console.log(title);

    return results;

  } catch (error) {
    console.log(title + ' Error', error);
  }
}