// @flow
const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/';
import type {
  ReactNativeGooglePlacesProps,
  PlaceDetailsResponse,
  AutocompleteResponse
} from '../types'

type Props = ReactNativeGooglePlacesProps;

export default class ReactNativeGooglePlacesWeb {
  props: Props;

  _apiKey: ?string;
  _logEvents: boolean = false;

  constructor(opts: Props = { apiKey: undefined, log: false }) {
    if (opts) {
      this._apiKey = opts.apiKey;
      this._logEvents = opts.log;
    } else {
      this._apiKey = null;
    }

    this._log(`API KEY`, this._apiKey);
  }

  _log(message: string): void {
    if (this._logEvents) {
      console.log('GOOGLE_PLACES', message);
    }
  }

  _queryForPlacesDetails(placeId: string): string {
    if (!placeId) {
      throw new Error('Missing Google Place ID');
    }
    if (!this._apiKey) {
      throw new Error('Missing apikey');
    }

    return [
      GOOGLE_PLACES_API,
      'details/json',
      `?key=${this._apiKey}`,
      `&placeid=${placeId}`
    ].join('');
  }

  _queryForPlacesAutoComplete(addressString: string): string {
    if (!addressString) {
      throw new Error('Missing partial address');
    }
    if (!this._apiKey) {
      throw new Error('Missing apikey');
    }

    return [
      GOOGLE_PLACES_API,
      'autocomplete/json',
      `?key=${this._apiKey}`,
      `&input=${encodeURIComponent(addressString)}`
    ].join('');
  }

  /**
   * Set the Google API Key from the Developer Console
   * @param apiKey The Google API key
   */
  setApiKey(apiKey: string) {
    this._apiKey = apiKey;
    this._log(`API KEY set`, apiKey);
  }

  /**
   * Retrieves a list of predictions of a partial address
   * @param addressString The partial address
   */
  placesAutoComplete(addressString: string) {
    if (!this._apiKey) {
      throw new Error('Invalid API Key');
    }

    let query = this._queryForPlacesAutoComplete(addressString);
    this._log(query);


    return fetch(query)
      .then((res: Response): Promise<AutocompleteResponse> => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Invalid request to Places API', res);
      })
      .then((json: AutocompleteResponse) => {
        this._log(JSON.stringify(json));
        if (json.status === 'OK') {
          return json.predictions;
        } else {
          throw new Error(json.status);
        }
      });
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   * @param placeId The placeId from a google result
   * @returns {Promise.<TResult>|*}
   */
  placesDetails(placeId: string): Promise<{}> {
    if (!this._apiKey) {
      throw new Error('Invalid API Key');
    }

    let query = this._queryForPlacesDetails(placeId);
    this._log(query);

    return fetch(query)
      .then((res: Response): Promise<PlaceDetailsResponse> => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Invalid request to Places API', res);
      })
      .then((json) => {
        this._log(JSON.stringify(json));
        if (json.status === 'OK') {
          return json.result;
        } else {
          throw new Error(json.status);
        }
      });
  }
}
