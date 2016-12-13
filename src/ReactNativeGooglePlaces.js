'use strict';
const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/';

class ReactNativeGooglePlaces {

  _apiKey = null;
  _logEvents = false;

  constructor(opts) {
    this._apiKey = opts.apiKey;
    this._logEvents = opts.log;
    this._log(`API KEY`, this._apiKey);
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
   * Set the Google API Key from the Developer Console
   * @param apiKey The Google API key
   */
  setApiKey(apiKey) {
    this._apiKey = apiKey;
    this._log(`API KEY set`, apiKey);
  }

  /**
   * Retrieves a list of predictions of a partial address
   * @param addressString The partial address
   */
  placesAutoComplete(addressString) {
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
  placesDetails(placeId) {
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

module.exports = ReactNativeGooglePlaces;