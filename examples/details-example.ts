import Places from "../dist/google";
import { GooglePlaceDetailsResponse } from "../dist/google/google";
import { performSearch } from "./utils";


try {
  const apiKey = process.env.PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PLACES_API_KEY env variable");
  }

  Places.apiKey = apiKey;

  // eslint-disable-next-line no-inner-declarations
  async function run() {
    try {
      const whiteHousePlaceID = "ChIJGVtI4by3t4kRr51d_Qm_x58";
      const response: GooglePlaceDetailsResponse = await performSearch("Places Details", Places.details, { placeid: whiteHousePlaceID });

      console.log('Details Result', response.result);

    } catch (error) {
      console.log("Error", error);
    }
  }

  run();
} catch (error) {
  if (error.message === "Missing PLACES_API_KEY env variable") {
    console.log(error.message);
    console.log("\tTo run the example:");
    console.log("\tPLACES_API_KEY=<your_key_here> ts-node examples/example-file.ts");
  } else {
    console.log(error);
  }
}
