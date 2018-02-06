import { API } from './Constants';
import QueryString from 'query-string';
import axios from 'axios';

const placesAxios = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place'
});

export class GooglePlaces {
  constructor(opts = {}) {
    const { apiKey, debug } = opts;
    this.apiKey = apiKey;
    this.debug = debug;
  }

  /**
   * Set the Google API Key from the Developer Console
   * @param {string} apiKey The Google API key
   */
  set apiKey(apiKey) {
    if (apiKey && (typeof apiKey !== 'string' || !apiKey.match(/^[^\s]+$/ig))) {
      throw new Error('Invalid API Key');
    }

    this._apiKey = apiKey;
  }

  get apiKey() {
    return this._apiKey;
  }

  /**
   * Set debugging mode which will log events
   * @param {boolean} isDebug true or false to enable debug mode
   */
  set debug(isDebug) {
    this._debug = isDebug;
  }

  /**
   * Parse through a params object creating URI Components
   * @param {Array} config.requiredKeys Required params needed for the request
   * @param {Array} [config.optionalKeys] Optional params that are allowed optionally
   * @param {Object} params The params hash to parse
   * @returns {Object} A filtered hash of valid params
   * @private
   */
  _permitParams({ requiredKeys, optionalKeys }, params) {
    // Validate required keys are present
    if (!requiredKeys || !requiredKeys.length) {
      throw new Error('No required params defined');
    } else if (!params) {
      throw new Error('No parameters provided');
    }


    const missingKeys = [];

    // Filter required params
    const filteredRequiredParams = requiredKeys.reduce((p, key) => {
      const param = params[key];
      if (param) {
        p[key] = param;
      } else {
        missingKeys.push(key);
      }
      return p;
    }, {});

    if (missingKeys.length) {
      throw new Error(`Missing required params: [${missingKeys.join(', ')}]`);
    }

    // Filter optional params
    const filteredOptionalParams = optionalKeys.reduce((p, key) => {
      const param = params[key];
      if (param) {
        p[key] = param;
      }
      return p;
    }, {});

    this._log('google-places-web (params)', JSON.stringify(params));
    return Object.assign({}, filteredRequiredParams, filteredOptionalParams);
  }

  /**
   * Logs messages based on the _debug
   * @param {string} title
   * @param {string} message
   * @private
   */
  _log(title, message) {
    if (this._debug) {
      console.log(title || 'google-places-web', message);
    }
  }

  /**
   * helper method to build the query uri
   * @param {string} path
   * @param {Object} params The parmas to stringify to the url
   * @returns {string} a uri with attached parameters
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
      `/${path}/json`,
      `?key=${this._apiKey}`
    ].join('');

    const parts = QueryString.stringify(params);
    const query = `${uri}&${parts}`;
    this._log('google-places-web (query)', query);
    return query;
  }

  /**
   *
   * @param {string} path The API Path for the query
   * @param {Object} params The parameters to concatinate into the url
   * @returns {Promise}
   * @private
   */
  _query(path, params) {
    const query = this._buildUri(path, params);
    return placesAxios.get(query)
      .then(response => {
        const { data } = response;
        this._log('google-places-web (data)', data);
        if (data.status !== 'OK') {
          throw new Error(data.status);
        }
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Retrieves a list of predictions of a partial address
   * @param {Object} [opts] Optional parameters for Google API
   * @returns {Promise}
   */
  autocomplete(opts) {
    const params = this._permitParams(API.AUTOCOMPLETE, opts);
    return this._query(API.AUTOCOMPLETE.path, params)
      .then(res => res.predictions);
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   * @param {Object} [opts] Optional parameters for Google API
   * @returns {Promise}
   */
  details(opts) {
    const params = this._permitParams(API.DETAILS, opts);
    return this._query(API.DETAILS.path, params)
      .then(json => json.result);
  }

  /**
   *
   * @param {Object} [opts] Optional parameters for Google API
   * @returns {Promise}
   */
  nearbysearch(opts = {}) {
    const params = this._permitParams(API.NEARBY_SEARCH, opts);
    return this._query(API.NEARBY_SEARCH.path, params)
      .then(res => res.results);
  }

  /**
   *
   * @param {Object} [opts] Optional parameters for Google API
   */
  textsearch(opts = {}) {
    const params = this._permitParams(API.TEXT_SEARCH, opts);

    return this._query(API.TEXT_SEARCH.path, params)
      .then(res => res.results);

  }

  /**
   *
   * @param {Object} [opts] Optional parameters for Google API
   * @returns {Promise}
   */
  radarsearch(opts = {}) {
    const params = this._permitParams(API.RADAR_SEARCH, opts);

    if (!params.name && !params.keyword && !params.type) {
      throw new Error('Missing required parameter: [keyword, name, or type]');
    }

    return this._query(API.RADAR_SEARCH.path, params)
      .then(res => res.results);
  }
}

export default new GooglePlaces();
