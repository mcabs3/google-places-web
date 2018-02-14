# Google Places Web
A promise-based wrapper for the Google Places JS SDK for Node and React Native.

## Installation

```shell
yarn add google-places-web;
npm i google-places-web -S
```

## Importing

```javascript
// ES6
import Places from 'google-places-web';

// ES5
var Places = require('google-places-web');

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
import Places from 'google-places-web'
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

## Troubleshooting

## Errors
- `Invalid API Key` - The instance of the `GooglePlaces` object does not have a valid API key from Google. Make sure you are either using `import Places from...` or `import {GooglePlaces} from...`. `GooglePlaces` is the base class so you would need to make an instance of it first.
- `STATUS_MESSAGE` - Google responds with HTTP 200 but JSON contains an "error". This is parsed from the Google API response, ex. `ZERO_RESULTS`
- `Missing required params: [<PARAM1>, <PARAM2>] ` - Required params PARAM1 & PARAM2 are `undefined` or `null`
- `No parameters provided` - A method was called without passing a parameters object to the method, most likely passed `null`, `undefined` or nothing. ex. `Places.autocomplete();` instead of `Places.autcomplete({foo: 'barr});`

## Important Notes
**Google states that you can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the [Powered by Google](https://developers.google.com/places/web-service/policies#logo_requirements) logo.**