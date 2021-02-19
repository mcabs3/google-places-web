import Places, { GooglePlaceDetailsResponse } from '../dist';
import { getApiKey, performSearch } from './utils';

Places.apiKey = getApiKey();

// eslint-disable-next-line no-inner-declarations
async function run() {
  try {
    const whiteHousePlaceID = 'ChIJGVtI4by3t4kRr51d_Qm_x58';
    const response: GooglePlaceDetailsResponse = await performSearch(
      'Places Details',
      Places.details,
      { placeid: whiteHousePlaceID }
    );

    console.log('Details Result', response.result);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
