import Places from '../dist';
import { getApiKey } from './utils';

Places.apiKey = getApiKey();

// eslint-disable-next-line no-inner-declarations
async function run() {
  try {
    const response = await Places.textsearch({
      query: 'Sydney Austrailia'
    });

    console.log('Example Text Results', response.results[0]);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
