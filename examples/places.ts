import { PlacesSearchFactory } from '../dist';
import { getApiKey } from './utils';

const places = new PlacesSearchFactory(getApiKey());

async function run() {
  try {
    const search = places.nearbysearch();

    const response = await search
      .set('location', '-37.814,144.96332')
      .set('rankby', 'distance')
      .exec();

    console.log('Example Nearby Result', response.results[0]);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
