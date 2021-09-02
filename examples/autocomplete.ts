import Places from '../dist';
import { getApiKey } from './utils';

async function run() {
  try {
    Places.apiKey = getApiKey();
    const response = await Places.autocomplete({
      input: '1600 Pennsylv',
      radius: 2000,
      language: 'en'
    });

    console.log('Example Autocomplete Prediction', response.predictions[0]);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
