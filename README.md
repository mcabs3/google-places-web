# Welcome to V2!

V2 is a complete rewrite to provide better TypeScript support and infrastructure for validations with more flexibility. Google Places Web provides both base classes and a factory implementation to make it flexible and easy to use. There are breaking changes so please read through the readme below.

# What is this?

A promise-based integration with [Google Places for Node](https://developers.google.com/places/web-service/search) or server-side JS platforms. This cannot be used as a front-end solution (Angular/React/Vue/Vanilla, etc) because Google has provided their own client [JS SDK](https://developers.google.com/maps/documentation/javascript/places)

### Implemented Searches

- [Find By Text](https://developers.google.com/places/web-service/search#FindPlaceRequests)
- [Text Search](https://developers.google.com/places/web-service/search#TextSearchRequests)
- [Nearby Search](https://developers.google.com/places/web-service/search#PlaceSearchRequests)
- [Autocomplete](https://developers.google.com/places/web-service/autocomplete)
- [Query Autocomplete](https://developers.google.com/places/web-service/query)
- [Place Details](https://developers.google.com/places/web-service/details)

### TypeScript

Please note that the google docs aren't always thorough at describing the format of results you get from each endpoint. I have spend a good amount of time trying to make sure the response types are as accurate as possible. If something is not accurate, feel free to open a pull request explaining the inconsistency with the correction.

## Installation

```shell
# with yarn
yarn add google-places-web

# with npm
npm i google-places-web -S
```

## Usage

```typescript
import {
  AutoCompleteSearch,
  FindByTextSearch,
  NearbySearch,
  PlaceDetailsSearch,
  QueryAutoCompleteSearch,
  TextSearch,
} from "google-places-web";
```

```typescript
// ES6
import { PlacesSearchFactory, NearbySearch } from "google-places-web";

// create your own instance of a search
const search = new NearbySearch();
search.setApiKey("your-api-key");

// OR create a singleton factory to create searches reusing the api key
const factory = new PlacesSearchFactory("your-api-key");
const search = factory.nearbysearch();
const search2 = factory.nearbysearch();
```

## Methods

Each search is the same type of builder-like implementation. Create an instance of the search, set the desired/required parameters, and asynchronously execute the search.

| Method                    | Return Type              | Description                                                                                                     |
| ------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `setApiKey(key: string)`  | `self`                   | Set the API key for the search                                                                                  |
| `set(key: string, value)` | `self`                   | Set a parameter to be included in the request                                                                   |
| `get(key: string)`        | `any | undefined`        | Get a parameter from the building requst                                                                        |
| `remove(key: string)`     | `boolean`                | Deletes a parameter from the building requst if present, returns `true` if successful, false if not found       |
| `getParamsAsObject()`     | `object`                 | returns an object with all of the parameters for the search                                                     |
| `isValid()`               | `boolean`                | Returns `true` if the search has the correct parameters to initiate a search                                    |
| `exec()`                  | `Promise<PlacesReponse>` | Performs the search based on the parameters provided asynchronously. Will throw an error if unable to complete. |

## PlacesSearchFactory

This factory class has been added to create a singleton use of this library. You can use this class to generate preconfigured searches. Injecting your API key into a new search. This is a familiar approach to how v1 was implemented.

```typescript
const Places = new PlacesSearchFactory("you-api-key");

await Places.nearbysearch().set("radius", 500).exec();

await Places.textsearch().set("location", "0,0").exec();

await Places.autocomplete().set("input", "White House").exec();
```

## Full Example

Make sure you have the dependencies installed (`yarn`) and have built it with `yarn build`.

```shell
# will build and run the example, replace with your google api key
> PLACES_API_KEY=<your_key_here> yarn ts-node examples/whatever-example.ts
```

## Troubleshooting/Contributing

Feel free to file issues as you see fit, and always looking for collaborators to help make this better. If you are interested in contributing, you may clone the repository, and create a `.ts` file for an example

## Errors

- `Invalid API Key` - The instance of the `GooglePlaces` object does not have a valid API key from Google. Make sure you are either using `import Places from...` or `import {GooglePlaces} from...`. `GooglePlaces` is the base class so you would need to make an instance of it first.
- `STATUS_MESSAGE` - Google responds with HTTP 200 but JSON contains an "error". This is parsed from the Google API response, ex. `ZERO_RESULTS`
- `Missing required params: [<PARAM1>, <PARAM2>]` - Required params PARAM1 & PARAM2 are `undefined` or `null`
- `No parameters provided` - A method was called without passing a parameters object to the method, most likely passed `null`, `undefined` or nothing. ex. `Places.autocomplete();` instead of `Places.autcomplete({foo: 'bar'});`

## Important Notes

**Google states that you can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the [Powered by Google](https://developers.google.com/places/web-service/policies#logo_requirements) logo.**
