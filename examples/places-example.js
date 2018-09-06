try {
  const Places = require("../dist/index").default;
  const apiKey = process.env.PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PLACES_API_KEY env variable");
  }

  Places.apiKey = apiKey;
  console.log("Set API Key", Places.apiKey);

  async function run() {
    try {
      let partialAddress = "1600 Pennsylv";
      const radius = 2000;
      const language = "en";
      const results = await Places.autocomplete({
        input: partialAddress,
        radius,
        language
      });
      console.log("\n####################");
      console.log("Autocomplete Results");
      console.log("####################");
      // results array of partial matches
      results.map((result, idx) => {
        console.log(idx, result.description);
      });

      const whiteHousePlaceID = "ChIJGVtI4by3t4kRr51d_Qm_x58";
      const result = await Places.details({ placeid: whiteHousePlaceID });
      console.log("\n####################");
      console.log("Places Results");
      console.log("####################");
      console.log("Place", result.name);
    } catch (error) {
      console.log("Error", error);
    }
  }

  run();
} catch (error) {
  if (error.message === 'Missing PLACES_API_KEY env variable') {
    console.log(error.message);
    console.log('\tTo run the example:')
    console.log('\tPLACES_API_KEY=<your_key_here> node places-example.js');
  } else {
    console.log(error);
  }
}
