export async function performSearch<T = any>(
  title: string,
  search: (opts: T) => any,
  params: T
): Promise<any> {
  try {
    const results = await search(params);

    console.log('\n####################');
    console.log(title);

    return results;
  } catch (error) {
    console.log(title + ' Error', error);
  }
}

export function getApiKey(): string {
  const apiKey = process.env.PLACES_API_KEY;
  if (!apiKey) {
    console.log('\tTo run the example:');
    console.log(
      '\tPLACES_API_KEY=<your_key_here> yarn run:example example/{type}-example.js'
    );
    throw new Error('Missing PLACES_API_KEY env variable');
  }
  return apiKey;
}
