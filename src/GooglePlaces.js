'use strict';
const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/';


export const PARAMS_MAP = {
  DETAILS: {
    required: ['placeId'],
    optional: []
  },
  AUTOCOMPLETE: {
    required: [],
    optional: []
  }
};

/**
 * Parse through a params object creating URI Components
 * @param requiredKeys Required params needed for the request
 * @param optionalKeys Optional params that are allowed optionally
 * @param params The params hash to parse
 * @returns {{}} A filtered hash of valid params
 * @private
 */
export function permitParams({requiredKeys, optionalKeys}, params) {
  // Validate params are present
  if (!params || Object.keys(params).length === 0) {
    throw new Error('Missing Params');
  }

  // Validate required keys are present
  if (!requiredKeys || requiredKeys.length === 0) {
    throw new Error('No required params defined');
  }

  let filteredParams = {};

  let missingKeys = [];
  // Validate required params
  for (let i = 0; i < requiredKeys.length; i++) {
    if (params[requiredKeys[i]]) {
      filteredParams[requiredKeys[i]] = params[requiredKeys[i]];
    } else {
      missingKeys.push(requiredKeys[i]);
    }
  }

  if (missingKeys.length !== 0) {
    throw new Error(`Missing required params: [${missingKeys.join(', ')}]`)
  }

  // Validate optional params
  if (optionalKeys && optionalKeys.length > 0) {
    for (let i = 0; i < optionalKeys.length; i++) {
      if (params[optionalKeys[i]]) {
        filteredParams[optionalKeys[i]] = params[optionalKeys[i]];
      }
    }
  }

  return filteredParams;
}

let instance = null;
class GooglePlaces {

  constructor(opts) {
    if (opts) {
      this._apiKey = opts.apiKey;
      this._logEvents = opts.log;
    } else {
      this._apiKey = null;
    }
    this._log(`API KEY`, this._apiKey);
    // if (!instance) {
    //   instance = this;
    // }
  }

  _log(message) {
    if (this._logEvents) {
      console.log('GOOGLE_PLACES', message);
    }
  }

  _queryForPlacesDetails(placeId) {
    if (!placeId) {
      throw new Error('Missing Google Place ID');
    }

    return [
      GOOGLE_PLACES_API,
      'details/json',
      `?key=${this._apiKey}`,
      `&placeid=${placeId}`
    ].join('');
  }

  _queryForPlacesAutoComplete(addressString) {
    if (!addressString) {
      throw new Error('Missing partial address');
    }

    return [
      GOOGLE_PLACES_API,
      'autocomplete/json',
      `?key=${this._apiKey}`,
      `&input=${encodeURIComponent(addressString)}`
    ].join('');
  }

  /**
   * Performs the fetch to google, returning the raw json result
   */
  _query(path, params) {
    if (!path) {
      throw new Error('Missing URL');
    } else if (!params) {
      throw new Error('No params provided');
    }

    const url = [
      GOOGLE_PLACES_API,
      `/${path}`,
      '/json',
    ].join('');

    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Google responded not ok');
        }
      })
  }

  /**
   * Set the Google API Key from the Developer Console
   * @param apiKey The Google API key
   */
  set apiKey(apiKey) {
    if (apiKey && (typeof apiKey !== 'string' || !apiKey.match(/^[^\s]+$/ig))) {
      throw new Error('Invalid API Key');
    }

    this._apiKey = apiKey;
    this._log(`API KEY set`, apiKey);
  }

  get apiKey() {
    return this._apiKey;
  }

  search(opts) {
    if (!this._apiKey) {

    }
  }

  /**
   * Retrieves a list of predictions of a partial address
   * @param addressString The partial address
   */
  autoComplete(addressString) {
    if (!this._apiKey) {
      throw new Error('Invalid API Key');
    }

    let query = this._queryForPlacesAutoComplete(addressString);
    this._log(query);


    return fetch(query)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
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
  detailsByID(placeId) {
    if (!this._apiKey) {
      throw new Error('Invalid API Key');
    }

    let query = this._queryForPlacesDetails(placeId);
    this._log(query);

    return fetch(query)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        this._log(JSON.stringify(json));
        if (json.status === 'OK') {
          return json.result;
        } else {
          throw new Error(json.status);
        }
      });
  }
}
export default new GooglePlaces();
// export default GooglePlaces;
