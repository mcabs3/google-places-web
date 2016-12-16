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
import 'ReactNativeGooglePlacesWeb'
let places = new ReactNativeGooglePlacesWeb({apiKey: 'YOUR_API_KEY', log: true});

// ES5
var ReactNativeGooglePlacesWeb = require('ReactNativeGooglePlacesWeb');
var places = new ReactNativeGooglePlacesWeb({apiKey: 'YOUR_API_KEY', log: true});

// Set API Key later
let places = new ReactNativeGooglePlacesWeb();
places.setApiKey('YOUR_API_KEY');
```


### [Places Autocomplete](https://developers.google.com/places/web-service/autocomplete)
```javascript
var partialAddress = '1600 Pennsylv';
var completeAddress = '1600 Pennsylvania Ave NW, Washington, DC 20500'

// Search with default opts
places.autocomplete(partialAddress)
  .then(results => {
    //
  });

let opts = {
  radius: 2000,
  language: 'en'
};
places.autocomplete(partialAddress, opts);
```
#### Example Response
```json
{
   "predictions" : [
      {
         "description" : "The White House, Pennsylvania Avenue Northwest, D.C., DC, United States",
         "id" : "08e382319596a3db01876b29415b2321e6562d60",
         "matched_substrings" : [
            {
               "length" : 11,
               "offset" : 4
            },
            {
               "length" : 4,
               "offset" : 48
            }
         ],
         "place_id" : "ChIJGVtI4by3t4kRr51d_Qm_x58",
         "reference" : "CmRfAAAAFZ7nV0-j8sDD5QI4aL2UCE2OfFstlOuyYzLK5uq89jmXCC8ERx1oBbnCtdzgbeEbj8-JiFqA1GjjCT7rutXkVYbMsymrmTXUkY2a_grpgJXLmG0JZH0TAp4p5oJhKQbhEhCyTLmL0euRJefyD9wuXk8DGhQZMU7TMl3-msdVoV3lXTEVgTFsRA",
         "structured_formatting" : {
            "main_text" : "The White House",
            "main_text_matched_substrings" : [
               {
                  "length" : 11,
                  "offset" : 4
               }
            ],
            "secondary_text" : "Pennsylvania Avenue Northwest, D.C., DC, United States",
            "secondary_text_matched_substrings" : [
               {
                  "length" : 4,
                  "offset" : 31
               }
            ]
         },
         "terms" : [
            {
               "offset" : 0,
               "value" : "The White House"
            },
            {
               "offset" : 17,
               "value" : "Pennsylvania Avenue Northwest"
            },
            {
               "offset" : 48,
               "value" : "D.C."
            },
            {
               "offset" : 54,
               "value" : "DC"
            },
            {
               "offset" : 58,
               "value" : "United States"
            }
         ],
         "types" : [ "premise", "geocode" ]
      },
    ],
  "status" : "OK"
}
```


### [Places Details](https://developers.google.com/places/web-service/details)
```javascript
const whiteHousePlaceID = '08e382319596a3db01876b29415b2321e6562d60'

// Search with default opts
places.detailsById(whiteHousePlaceID)
  .then(results => {
    // results
  });

let opts = {
  language: 'en'
};
places.detailsById(whiteHousePlaceID)
  .then(results => {
    // results
  });
```
#### Example Response
```json
{
   "html_attributions" : [],
   "result" : {
      "address_components" : [
         {
            "long_name" : "The White House",
            "short_name" : "The White House",
            "types" : [ "premise" ]
         },
         {
            "long_name" : "1600",
            "short_name" : "1600",
            "types" : [ "street_number" ]
         },
         {
            "long_name" : "Pennsylvania Avenue Northwest",
            "short_name" : "Pennsylvania Ave NW",
            "types" : [ "route" ]
         },
         {
            "long_name" : "Northwest Washington",
            "short_name" : "Northwest Washington",
            "types" : [ "neighborhood", "political" ]
         },
         {
            "long_name" : "Washington",
            "short_name" : "Washington",
            "types" : [ "locality", "political" ]
         },
         {
            "long_name" : "District of Columbia",
            "short_name" : "DC",
            "types" : [ "administrative_area_level_1", "political" ]
         },
         {
            "long_name" : "United States",
            "short_name" : "US",
            "types" : [ "country", "political" ]
         },
         {
            "long_name" : "20500",
            "short_name" : "20500",
            "types" : [ "postal_code" ]
         }
      ],
      "adr_address" : "\u003cspan class=\"extended-address\"\u003eThe White House\u003c/span\u003e, \u003cspan class=\"street-address\"\u003e1600 Pennsylvania Ave NW\u003c/span\u003e, \u003cspan class=\"locality\"\u003eWashington\u003c/span\u003e, \u003cspan class=\"region\"\u003eDC\u003c/span\u003e \u003cspan class=\"postal-code\"\u003e20500\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eUSA\u003c/span\u003e",
      "formatted_address" : "The White House, 1600 Pennsylvania Ave NW, Washington, DC 20500, USA",
      "geometry" : {
         "location" : {
            "lat" : 38.8976094,
            "lng" : -77.0367349
         },
         "viewport" : {
            "northeast" : {
               "lat" : 38.8976145,
               "lng" : -77.03492514999999
            },
            "southwest" : {
               "lat" : 38.8975941,
               "lng" : -77.03733815
            }
         }
      },
      "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
      "id" : "514afa7f640341cd7dcd38b94c6af9486604f75b",
      "name" : "The White House",
      "photos" : [
         {
            "height" : 2048,
            "html_attributions" : [
               "\u003ca href=\"https://maps.google.com/maps/contrib/105336685193092059775/photos\"\u003eHasit Shah\u003c/a\u003e"
            ],
            "photo_reference" : "CoQBdwAAAKmYxG-CTGUqNfEfWgmSSy6SVtF8KTqnQ7brBFbwdwqDOIJZT5GOP-phKx-2cPsxHvdVqJMIRBczKsmdtIekNnvaZFvBDd62x1g47P5DxMgO2Q9630GfLq-5dLFqI2OnQMZMJdBbCdQ8MgDeXxAKI6q3p7Z6VHXWSXDjSJvgjx4EEhBG-PfjZYxaN9zxTKZz0LEUGhRaD-1vFKiO5FG1qu2g0JEW9rqTPA",
            "width" : 3072
         }
      ],
      "place_id" : "ChIJGVtI4by3t4kRr51d_Qm_x58",
      "reference" : "CmRbAAAAouZXS1glaWDS3wzx0OGu5jDe4Gn1Z1hysicgNVAdXgRl5iZAxpGcCilMYir0lYwBMnwDw7dDXcHRnl2wnxdJFhXRZ4D2WeiVUFaZ_4v9mknT9mDgAqW1KYMKugigR_tYEhC0f6LLS40Wpbj4kT0T5zLMGhTP5O1ADlK_NahhPgEKpOt9Nj2cUQ",
      "scope" : "GOOGLE",
      "types" : [ "premise", "point_of_interest", "establishment" ],
      "url" : "https://maps.google.com/?q=The+White+House&ftid=0x89b7b7bce1485b19:0x9fc7bf09fd5d9daf",
      "utc_offset" : -300,
      "vicinity" : "Washington"
   },
   "status" : "OK"
}
```

## Errors
- `Invalid API Key`: Your API key was never set
- `STATUS_MESSAGE`: This is parsed from the Google API response, ex. `ZERO_RESULTS`
- `Missing ENTITY`: `null` or `undefined` is being passed to an api call

## Important Notes
**Google states that you can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the [Powered by Google](https://developers.google.com/places/web-service/policies#logo_requirements) logo.**