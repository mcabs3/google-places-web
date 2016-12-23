'use strict';
import {GOOGLE_PLACES_API, API} from './GoogleConstants';

class GooglePlaces {

  constructor() {
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

  /**
   * Set debugging mode which will log events
   * @param isDebug
   */
  set debug(isDebug) {
    this._debug = isDebug;
  }

  /**
   * Parse through a params object creating URI Components
   * @param requiredKeys Required params needed for the request
   * @param optionalKeys Optional params that are allowed optionally
   * @param params The params hash to parse
   * @returns {{}} A filtered hash of valid params
   * @private
   */
  _permitParams({requiredKeys, optionalKeys}, params) {
    // Validate params are present
    if (!params || Object.keys(params).length === 0) {
      throw new Error('Missing Params');
    }


    // Validate required keys are present
    if (!requiredKeys || requiredKeys.length === 0) {
      throw new Error('No required params defined');
    }

    const filteredParams = {};
    const missingKeys = [];
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
    this._log('Google Places Params: ', JSON.stringify(params));
    return filteredParams;
  }

  /**
   * Logs messages based on the _debug
   * @param message
   * @private
   */
  _log(title, message) {
    if (this._debug) {
      if (!message) {
        console.log('Google Places API:', message);
      } else {
        console.log(title, message);
      }

    }
  }

  /**
   * helper method to build the query uri
   * @param path
   * @returns {string}
   * @private
   */
  _buildUri(api, params = {}) {
    if (!this._apiKey) {
      throw new Error('Invalid API key');
    } else if (!api.path) {
      throw new Error('Google API path is required');
    }

    params = this._permitParams(api, params);

    let uri = [
      GOOGLE_PLACES_API,
      `/${path}`,
      '/json',
      `?key=${this._apiKey}`
    ].join('');

    const parts = [];
    for (let key in params) {
      parts.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    const query = `${uri}&${parts.join('&')}`;
    this._log('Google Places Query: ', query);
    return query;
  }

  /**
   * Fetches the results from the google api
   * @param path The url to the proper Google Endpoint
   * @param params The params to concat into the url
   * @returns {Promise.<TResult>} The result of the fetch
   * @private
   */
  _query(query) {
    if (!query) {
      throw new Error('No query provided');
    }

    return fetch(query)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Google responded not ok');
        }
      })
  }

  /**
   * Retrieves a list of predictions of a partial address
   * @param input The partial address
   * @param opts Optional parameters for Google API
   * @returns {Promise.<TResult>}
   */
  autoComplete(opts = {}) {
    const query = this._buildUri(API.AUTOCOMPLETE, opts);
    return this._query(query)
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
  details(opts = {}) {
    const query = this._buildUri(API.DETAILS, params);
    return this._query(query)
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
