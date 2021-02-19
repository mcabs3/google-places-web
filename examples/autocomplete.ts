import { AutoCompleteSearch } from '../dist';
import { getApiKey } from './utils';

console.log('env', process.env);

async function run() {
  try {
    const search = new AutoCompleteSearch();
    search.setApiKey(getApiKey());
    search
      .set('input', '1600 Pennsylv')
      .set('radius', 2000)
      .set('language', 'en');

    const response: any = await search.exec();

    console.log('Example Autocomplete Prediction', response.predictions[0]);
  } catch (error) {
    console.log('Error', error);
  }
}

run();
