# Welcome to V2!

V2 is a complete rewrite to provide better TypeScript support and infrastructure for validations with more flexibility. Google Places Web provides a singleton (default) and exported class to make it flexible and easy to use. There are breaking changes so please read through the readme below.

# What is this?

A promise-based integration with [Google Places for Node](https://developers.google.com/places/web-service/search) or server-side JS platforms. This cannot be used as a front-end solution (Angular/React/Vue/Vanilla, etc) because Google has provided their own client [JS SDK](https://developers.google.com/maps/documentation/javascript/places)

### Implemented Searches

- [Find By Text](https://developers.google.com/places/web-service/search#FindPlaceRequests)
- [Text Search](https://developers.google.com/places/web-service/search#TextSearchRequests)
- [Nearby Search](https://developers.google.com/places/web-service/search#PlaceSearchRequests)
- [Autocomplete](https://developers.google.com/places/web-service/autocomplete)
- [Query Autocomplete](https://developers.google.com/places/web-service/query)
- [Place Details](https://developers.google.com/places/web-service/details)

### Deprecation Notice

**Radar Search** and **Find Place Search** have been deprecated and removed from the library.

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
// ES6
import Places from 'google-places-web';

Places.apiKey = 'your-api-key';

const search = await Places.nearbysearch({...});
const search2 = await Places.details({...});
```

## Running Examples

Make sure you have the dependencies installed (`yarn`) and have built it with `yarn build`.

**create a `.env` with your `PLACES_API_KEY` to make testing and development easier.**

```shell
# uses the PLACES_API_KEY from .env file and is required
> yarn run:example examples/{search}-example.ts
```

## Troubleshooting/Contributing

create a `.env` with your `PLACES_API_KEY` to make testing and development easier.

Feel free to file issues as you see fit, and always looking for collaborators to help make this better. If you are interested in contributing, you may clone the repository, and create a `.ts` file for an example you think would benefit to share.

## Errors

- `INVALID_REQUEST` - Google is respondig saying that your parameters provided is invalid.
- `Invalid API Key` - The instance of the `GooglePlaces` object does not have a valid API key from Google. Make sure you are either using `import Places from...` or `import {GooglePlaces} from...`. `GooglePlaces` is the base class so you would need to make an instance of it first.
- `STATUS_MESSAGE` - Google responds with HTTP 200 but JSON contains an "error". This is parsed from the Google API response, ex. `ZERO_RESULTS`
- `Missing required params: [<PARAM1>, <PARAM2>]` - Required params PARAM1 & PARAM2 are `undefined` or `null`
- `No parameters provided` - A method was called without passing a parameters object to the method, most likely passed `null`, `undefined` or nothing. ex. `Places.autocomplete();` instead of `Places.autcomplete({foo: 'bar'});`

## Important Notes

**Google states that you can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the [Powered by Google](https://developers.google.com/places/web-service/policies#logo_requirements) logo.**
