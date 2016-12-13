'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/';

var ReactNativeGooglePlacesWeb = function () {
  function ReactNativeGooglePlacesWeb(opts) {
    _classCallCheck(this, ReactNativeGooglePlacesWeb);

    if (opts) {
      this._apiKey = opts.apiKey;
      this._logEvents = opts.log;
    } else {
      this._apiKey = null;
    }
    this._log('API KEY', this._apiKey);
  }

  _createClass(ReactNativeGooglePlacesWeb, [{
    key: '_log',
    value: function _log(message) {
      if (this._logEvents) {
        console.log('GOOGLE_PLACES', message);
      }
    }
  }, {
    key: '_queryForPlacesDetails',
    value: function _queryForPlacesDetails(placeId) {
      if (!placeId) {
        throw new Error('Missing Google Place ID');
      }

      return [GOOGLE_PLACES_API, 'details/json', '?key=' + this._apiKey, '&placeid=' + placeId].join('');
    }
  }, {
    key: '_queryForPlacesAutoComplete',
    value: function _queryForPlacesAutoComplete(addressString) {
      if (!addressString) {
        throw new Error('Missing partial address');
      }

      return [GOOGLE_PLACES_API, 'autocomplete/json', '?key=' + this._apiKey, '&input=' + encodeURIComponent(addressString)].join('');
    }

    /**
     * Set the Google API Key from the Developer Console
     * @param apiKey The Google API key
     */

  }, {
    key: 'setApiKey',
    value: function setApiKey(apiKey) {
      this._apiKey = apiKey;
      this._log('API KEY set', apiKey);
    }

    /**
     * Retrieves a list of predictions of a partial address
     * @param addressString The partial address
     */

  }, {
    key: 'placesAutoComplete',
    value: function placesAutoComplete(addressString) {
      var _this = this;

      if (!this._apiKey) {
        throw new Error('Invalid API Key');
      }

      var query = this._queryForPlacesAutoComplete(addressString);
      this._log(query);

      return fetch(query).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (json) {
        _this._log(JSON.stringify(json));
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

  }, {
    key: 'placesDetails',
    value: function placesDetails(placeId) {
      var _this2 = this;

      if (!this._apiKey) {
        throw new Error('Invalid API Key');
      }

      var query = this._queryForPlacesDetails(placeId);
      this._log(query);

      return fetch(query).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }).then(function (json) {
        _this2._log(JSON.stringify(json));
        if (json.status === 'OK') {
          return json.result;
        } else {
          throw new Error(json.status);
        }
      });
    }
  }]);

  return ReactNativeGooglePlacesWeb;
}();

exports.default = ReactNativeGooglePlacesWeb;