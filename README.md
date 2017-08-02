# Google Places Web
This library was created to provide the Google Place Web (JS) API to be accessible for React (Web & Native), and Node projects. There are already many other libraries that implement the Native SDKs, but this library will allow you to use the same library for both Web and Mobile experience.

## THIS LIBRARY USES FETCH
I am a big fan of the fetch api to make promise based network requests. For applications such as react native, you don't need to provide a fetch polyfill, however for node or the web (for full support), a fetch polyfill is required for this library to work.

## Installation

```shell
// React Native
yarn add google-places-web;

// Web
yarn add google-places-web whatwg-fetch;

// Node
yarn add google-places-web node-fetch;
```

## Importing

```javascript
// ES6
import {Places} from 'google-places-web';

// ES5
var Places = require('google-places-web').Places;

// Setup
Places.apiKey = '<API_KEY>';
Places.debug = __DEV__; // boolean;
```


### [Places Autocomplete](https://developers.google.com/places/web-service/autocomplete)
```javascript
let partialAddress = '1600 Pennsylv';
const radius = 2000;
const language = 'en';

// Search with default opts
Places.autocomplete({ input: partialAddress, radius, language })
  .then(results => {
    // results array of partial matches
  })
  .catch(e => console.log(e));
```

### [Places Details](https://developers.google.com/places/web-service/details)
```javascript
const whiteHousePlaceID = 'ChIJGVtI4by3t4kRr51d_Qm_x58';

Places.details({ placeid: whiteHousePlaceID })
  .then(result => {
    // result object
  })
  .catch(e => console.log(e));
```

## Full Example

```javascript
'use strict';
import { Places } from 'google-places-web'
Places.apiKey = '<API_KEY>';
Places.debug = true;

Places.autocomplete({ input: '1600 Pennsylvania Ave' })
  .then(places => places[0] || {})
  .then(place => place.place_id ? Places.details({placeid: place.place_id}) : {})
  .then(details => {
    console.log(JSON.stringify(details, null, 2));
  })
  .catch(e => console.log(e.message));
```

## Errors
- `Invalid API Key`
- `STATUS_MESSAGE` - Google responds with HTTP 200 but JSON contains an "error". This is parsed from the Google API response, ex. `ZERO_RESULTS`
- `Missing required params: [<PARAM1>, <PARAM2>] ` - Required params PARAM1 & PARAM2 are `undefined` or `null`
- `No parameters provided` - A method was called without passing a parameters object to the method, most likely passed `null`, `undefined` or nothing. ex. `Places.autocomplete();` instead of `Places.autcomplete({foo: 'barr});`

## Important Notes
**Google states that you can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the [Powered by Google](https://developers.google.com/places/web-service/policies#logo_requirements) logo.**