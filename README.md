# React Native Google Places
This library was created to provide the Google Place web API to be accessible for react native. There are already many other libraries that implement the Native SDKs, but this library will allow you to use the same library in both Web and Mobile experience.

## Installation

```
# React Native
npm install --save react-native-google-places-web

# Web (Needs fetch in browser)
npm install --save react-native-google-places-web whatwg-fetch
```

## Examples

### Importing
```javascript
// ES6
import Places from 'ReactNativeGooglePlacesWeb';

// ES5
var Places = require('ReactNativeGooglePlacesWeb');

Places.apiKey = 'YOUR_API_KEY';
Places.debug = true;
```


### [Places Autocomplete](https://developers.google.com/places/web-service/autocomplete)
```javascript
var partialAddress = '1600 Pennsylv';
var completeAddress = '1600 Pennsylvania Ave NW, Washington, DC 20500'

// Search with default opts
Places.autocomplete({input: partialAddress})
  .then(results => {
    //
  });

const radius = 2000;
const language = 'en';
Places.autocomplete({input: partialAddress, radius, language);
```

### [Places Details](https://developers.google.com/places/web-service/details)
```javascript
const whiteHousePlaceID = '08e382319596a3db01876b29415b2321e6562d60'

Places.details({placeid: whiteHousePlaceID})
  .then(results => {
    // results
  });
````

## Errors
- `Invalid API Key`: Your API key was never set
- `STATUS_MESSAGE`: This is parsed from the Google API response, ex. `ZERO_RESULTS`
- `Missing ENTITY`: `null` or `undefined` is being passed to an api call

## Important Notes
**Google states that you can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the [Powered by Google](https://developers.google.com/places/web-service/policies#logo_requirements) logo.**