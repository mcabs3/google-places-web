# React Native Google Places
This library was created to provide the Google Place web API to be accessible for react native. There are already many other libraries that implement the Native SDKs, but this library will allow you to use the same library in both Web and Mobile experience.

## Installation

`npm install --save react-native-google-places-web`

## Examples
```javascript
// ES6
import 'ReactNativeGooglePlacesWeb'
let places = new ReactNativeGooglePlacesWeb({apiKey: 'YOUR_API_KEY', log: true});

// ES5
var ReactNativeGooglePlacesWeb = require('ReactNativeGooglePlacesWeb');
var places = new ReactNativeGooglePlacesWeb({apiKey: 'YOUR_API_KEY', log: true});

  
```