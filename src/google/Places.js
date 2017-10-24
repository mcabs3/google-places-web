import { GOOGLE_PLACES_API, API } from './Constants';
class GooglePlaces {
  constructor(opts = {}) {
    const { apiKey, debug } = opts;
    this.apiKey = apiKey;
    this.debug = debug;
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
  _permitParams({ requiredKeys, optionalKeys }, params) {
    // Validate required keys are present
    if (!requiredKeys || requiredKeys.length === 0) {
      throw new Error('No required params defined');
    } else if (!params) {
      throw new Error('No parameters provided');
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
    this._log('google-places-web (params): ', JSON.stringify(params));
    return filteredParams;
  }

  /**
   * Logs messages based on the _debug
   * @param title
   * @param message
   * @private
   */
  _log(title, message) {
    if (this._debug) {
      if (!message) {
        console.log('google-places-web:', message);
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
  _buildUri(path, params) {
    if (!this._apiKey) {
      throw new Error('Invalid API key');
    } else if (!path) {
      throw new Error('Google API path is required');
    } else if (!params) {
      throw new Error('Missing params');
    }

    const uri = [
      GOOGLE_PLACES_API,
      `${path}/json`,
      `?key=${this._apiKey}`
    ].join('');

    const parts = [];
    for (let key in params) {
      parts.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    const query = `${uri}&${parts.join('&')}`;
    this._log('google-places-web (query): ', query);
    return query;
  }

  /**
   *
   * @param path The API Path for the query
   * @param params The params to concat into the url
   * @returns {Promise}
   * @private
   */
  _query(path, params) {
    const query = this._buildUri(path, params);
    return fetch(query)
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(json => {
              this._log('JSON', JSON.stringify(json));
              if (json.status !== 'OK') {
                throw new Error(json.status);
              } else {
                return json;
              }
            });
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      });
  }

  /**
   * Retrieves a list of predictions of a partial address
   * @param opts Optional parameters for Google API
   * @returns {Promise}
   */
  autocomplete(opts) {
    const params = this._permitParams(API.AUTOCOMPLETE, opts);
    return this._query(API.AUTOCOMPLETE.path, params)
      .then(res => res.predictions);
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   * @param opts Optional parameters for Google API
   * @returns {Promise}
   */
  details(opts) {
    const params = this._permitParams(API.DETAILS, opts);

    return this._query(API.DETAILS.path, params)
      .then(json => json.result);
  }

  /**
   *
   * @param opts Optional parameters for Google API
   */
  nearbysearch(opts = {}) {
    const params = this._permitParams(API.NEARBY_SEARCH, opts);

    return this._query(API.NEARBY_SEARCH.path, params)
      .then(json => json.results);
  }

  /**
   *
   * @param opts Optional parameters for Google API
   */
  textsearch(opts = {}) {
    const params = this._permitParams(API.TEXT_SEARCH, opts);

    return this._query(API.TEXT_SEARCH.path, params)
      .then(json => json.results);

  }

  /**
   *
   * @param opts Optional parameters for Google API
   */
  radarsearch(opts = {}) {
    const params = this._permitParams(API.RADAR_SEARCH, opts);
    if (!params.name && !params.keyword && !params.type) {
      throw new Error('Missing required parameter: [keyword, name, or type]')
    }

    return this._query(API.RADAR_SEARCH.path, params)
      .then(json => json.results);
  }


}
export default new GooglePlaces();
