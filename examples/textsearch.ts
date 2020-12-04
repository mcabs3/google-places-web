import Places, { GooglePlaceTextSearchResponse } from '../dist';
import { getApiKey, performSearch } from './utils';

Places.apiKey = getApiKey();

// eslint-disable-next-line no-inner-declarations
async function run() {
  try {
    const response: GooglePlaceTextSearchResponse = await performSearch(
      'Text Search',
      Places.textsearch,
      {
        query: 'Sydney Austrailia'
      }
    );

    console.log('Example Text Results', response.results[0]);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
