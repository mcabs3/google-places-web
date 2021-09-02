import Places from '../dist';
import { getApiKey } from './utils';

Places.apiKey = getApiKey();

// eslint-disable-next-line no-inner-declarations
async function run() {
  try {
    const whiteHousePlaceID = 'ChIJGVtI4by3t4kRr51d_Qm_x58';
    const response = await Places.details({ placeid: whiteHousePlaceID });

    console.log(response.result);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
