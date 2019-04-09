// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Xnuv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GOOGLE_PLACES_API = "https://maps.googleapis.com/maps/api/place/";
exports.PlaceTypes = {
  ADDRESS: "address",
  ADMINISTRATIVE_AREA_LEVEL_1: "administrative_area_level_1",
  ADMINISTRATIVE_AREA_LEVEL_2: "administrative_area_level_2",
  CITIES: "(cities)",
  COUNTRY: "country",
  ESTABLISHMENT: "establishment",
  GEOCODE: "geocode",
  LOCALITY: "locality",
  POSTAL_CODE: "postal_code",
  REGIONS: "(regions)",
  SUBLOCALITY: "sublocality"
};
exports.API = {
  AUTOCOMPLETE: {
    optionalKeys: ["offset", "location", "radius", "language", "types", "strictbounds", "components", "sessiontoken"],
    path: "autocomplete",
    requiredKeys: ["input"]
  },
  DETAILS: {
    optionalKeys: ["language", "sessiontoken"],
    path: "details",
    requiredKeys: ["placeid"]
  },
  NEARBY_SEARCH: {
    optionalKeys: ["radius", "keyword", "language", "minprice", "maxprice", "name", "opennow", "rankby", "type", "pagetoken", "region"],
    path: "nearbysearch",
    requiredKeys: ["location"]
  },
  RADAR_SEARCH: {
    optionalKeys: ["keyword", "language", "minprice", "maxprice", "name", "opennow", "type"],
    path: "radarsearch",
    requiredKeys: ["location", "radius"]
  },
  TEXT_SEARCH: {
    optionalKeys: ["location", "radius", "language", "minprice", "maxprice", "opennow", "pagetoken", "type"],
    path: "textsearch",
    requiredKeys: ["query"]
  }
};
},{}],"b2Gr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = require("tslib");

var superagent = tslib_1.__importStar(require("superagent"));

var Constants_1 = require("./Constants");

var GOOGLE_MAPS_API_TARGET = "https://maps.googleapis.com/maps/api/place";

var GooglePlaces = function () {
  function GooglePlaces(opts) {
    if (opts === void 0) {
      opts = {
        debug: false
      };
    }

    this._debug = false;
    var apiKey = opts.apiKey,
        debug = opts.debug;
    this.apiKey = apiKey;
    this.debug = debug;
  }

  GooglePlaces.prototype.autocomplete = function (opts) {
    var params = this._permitParams(Constants_1.API.AUTOCOMPLETE, opts);

    return this._query(Constants_1.API.AUTOCOMPLETE.path, params).then(function (res) {
      return res.predictions;
    });
  };

  GooglePlaces.prototype.details = function (opts) {
    var params = this._permitParams(Constants_1.API.DETAILS, opts);

    return this._query(Constants_1.API.DETAILS.path, params).then(function (json) {
      return json.result;
    });
  };

  GooglePlaces.prototype.nearbysearch = function (opts) {
    if (opts === void 0) {
      opts = {};
    }

    var params = this._permitParams(Constants_1.API.NEARBY_SEARCH, opts);

    return this._query(Constants_1.API.NEARBY_SEARCH.path, params).then(function (res) {
      return res.results;
    });
  };

  GooglePlaces.prototype.textsearch = function (opts) {
    if (opts === void 0) {
      opts = {};
    }

    var params = this._permitParams(Constants_1.API.TEXT_SEARCH, opts);

    return this._query(Constants_1.API.TEXT_SEARCH.path, params).then(function (res) {
      return res.results;
    });
  };

  GooglePlaces.prototype.radarsearch = function (opts) {
    if (opts === void 0) {
      opts = {};
    }

    var params = this._permitParams(Constants_1.API.RADAR_SEARCH, opts);

    if (!params.name && !params.keyword && !params.type) {
      throw new Error("Missing required parameter: [keyword, name, or type]");
    }

    return this._query(Constants_1.API.RADAR_SEARCH.path, params).then(function (res) {
      return res.results;
    });
  };

  Object.defineProperty(GooglePlaces.prototype, "apiKey", {
    get: function () {
      return this._apiKey;
    },
    set: function (apiKey) {
      if (apiKey && (typeof apiKey !== "string" || !apiKey.match(/^[^\s]+$/gi))) {
        throw new Error("Invalid API Key");
      }

      this._apiKey = apiKey;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GooglePlaces.prototype, "debug", {
    set: function (isDebug) {
      this._debug = isDebug;
    },
    enumerable: true,
    configurable: true
  });

  GooglePlaces.prototype._googleApiRequest = function (url, params) {
    var target = "" + GOOGLE_MAPS_API_TARGET + url;

    this._log("GPW:REQ " + target, JSON.stringify(tslib_1.__assign({}, params)));

    return superagent.get(target).query(tslib_1.__assign({
      key: this.apiKey
    }, params));
  };

  GooglePlaces.prototype._permitParams = function (_a, params) {
    var requiredKeys = _a.requiredKeys,
        optionalKeys = _a.optionalKeys;

    if (!requiredKeys || !requiredKeys.length) {
      throw new Error("No required params defined");
    } else if (!params) {
      throw new Error("No parameters provided");
    }

    var missingKeys = [];
    var filteredRequiredParams = requiredKeys.reduce(function (p, key) {
      var param = params[key];

      if (param) {
        p[key] = param;
      } else {
        missingKeys.push(key);
      }

      return p;
    }, {});

    if (missingKeys.length) {
      throw new Error("Missing required params: [" + missingKeys.join(", ") + "]");
    }

    var filteredOptionalParams = optionalKeys.reduce(function (p, key) {
      var param = params[key];

      if (param) {
        p[key] = param;
      }

      return p;
    }, {});

    this._log("GPW:PARAMS", JSON.stringify(params));

    return tslib_1.__assign({}, filteredOptionalParams, filteredRequiredParams);
  };

  GooglePlaces.prototype._log = function (title, message) {
    if (this._debug) {
      console.log(title, message);
    }
  };

  GooglePlaces.prototype._query = function (path, params) {
    return tslib_1.__awaiter(this, void 0, Promise, function () {
      var response, body, error_1;
      return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this._apiKey) {
              throw new Error("Invalid API key");
            } else if (!path) {
              throw new Error("Google API path is required");
            } else if (!params) {
              throw new Error("Missing params");
            }

            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4, this._googleApiRequest("/" + path + "/json", params)];

          case 2:
            response = _a.sent();
            body = response.body;

            this._log("GPW:RES", body);

            if (body.status !== "OK") {
              throw new Error(body.status);
            }

            return [2, body];

          case 3:
            error_1 = _a.sent();
            throw error_1;

          case 4:
            return [2];
        }
      });
    });
  };

  return GooglePlaces;
}();

exports.GooglePlaces = GooglePlaces;
exports.default = new GooglePlaces();
},{"./Constants":"Xnuv"}],"7QCb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = require("tslib");

var Places_1 = tslib_1.__importStar(require("./Places"));

exports.GooglePlaces = Places_1.GooglePlaces;

var Constants_1 = require("./Constants");

exports.GOOGLE_PLACES_API = Constants_1.GOOGLE_PLACES_API;
exports.API = Constants_1.API;
exports.default = Places_1.default;
},{"./Places":"b2Gr","./Constants":"Xnuv"}]},{},["7QCb"], null)
//# sourceMappingURL=/index.js.map