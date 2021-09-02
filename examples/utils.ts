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
