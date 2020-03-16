// tslint:disable: no-console
/// <reference types="node" />
/// <reference path="../dist/@types/index.d.ts" />

import { PlacesSearchFactory } from '../dist/google/PlacesSearchFactory';

try {
  const apiKey = process.env.PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PLACES_API_KEY env variable");
  }

  const places = new PlacesSearchFactory(apiKey);

  async function run() {
    try {
      const search = places.nearbysearch();

      const response = await search.set('location', "-37.814,144.96332").set('rankby', 'distance').exec();

      console.log('Example Nearby Result', response.results[0]);

    } catch (error) {
      console.log("Error", error);
    }
  }

  run();
} catch (error) {
  if (error.message === "Missing PLACES_API_KEY env variable") {
    console.log(error.message);
    console.log("\tTo run the example:");
    console.log("\tPLACES_API_KEY=<your_key_here> node places-example.js");
  } else {
    console.log(error);
  }
}
