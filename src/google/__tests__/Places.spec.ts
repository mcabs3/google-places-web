/* eslint-disable @typescript-eslint/no-explicit-any */
import Places from '../Places';
import { GooglePlaceAutocompletePrediction } from '../../types';

const MASTER_KEY = process.env.PLACES_API_KEY;
const key1 = 'TestKey';
const key2 = '019494949494';
const key3 = null;
const invalidKey1 = 3030293949393;
const invalidKey2 = 'asdfdfjfjd sjdfjd';

beforeEach(() => {
  Places.apiKey = undefined;
});

describe('API Key', () => {
  it('should set the API Key', () => {
    Places.apiKey = key1;
    expect(Places.apiKey).toBe(key1);

    Places.apiKey = key2;
    expect(Places.apiKey).toBe(key2);

    try {
      Places.apiKey = key3 as any;
    } catch (error) {
      expect(Places.apiKey).toBe(key2);
      expect(error.message).toMatch('Invalid API Key');
    }
  });

  it('should throw an error for invalid API Key', () => {
    expect(() => (Places.apiKey = invalidKey1 as any)).toThrow(
      'Invalid API Key'
    );
    expect(Places.apiKey).toBe(undefined);

    expect(() => (Places.apiKey = invalidKey2)).toThrow('Invalid API Key');
    expect(Places.apiKey).toBe(undefined);
  });
});

describe('Details', () => {
  it('should throw an error for missing data', async () => {
    Places.apiKey = key1;
    expect.assertions(1);
    try {
      await Places.details();
    } catch (error) {
      expect(error.message).toMatch('No parameters provided');
    }
  });

  it('should throw an error for null details', async () => {
    Places.apiKey = key1;
    expect.assertions(1);
    try {
      await Places.details(null as any);
    } catch (error) {
      expect(error.message).toMatch('No parameters provided');
    }
  });

  it('should successfully find Wrigley Field', async () => {
    Places.apiKey = MASTER_KEY;
    const WRIGLEY_FIELD_PLACE_ID = 'ChIJId-a5bLTD4gRRtbdduE-6hw';
    const wrigley = await Places.details({ placeid: WRIGLEY_FIELD_PLACE_ID });
    expect(wrigley.result).toBeDefined();

    const { types, url, geometry, name } = wrigley.result;
    expect(name).toBe('Wrigley Field');
    expect(url).toBe('https://maps.google.com/?cid=2083546915695089222');
    expect(types).toContain('stadium');
    expect(geometry.location).toEqual({ lat: 41.9484384, lng: -87.6553327 });
  });
});

describe('Autocomplete', () => {
  it('should throw an error for missing data', async () => {
    Places.apiKey = key1;
    expect.assertions(1);
    try {
      await Places.autocomplete();
    } catch (error) {
      expect(error.message).toMatch('No parameters provided');
    }
  });

  it('should throw an error for null details', async () => {
    Places.apiKey = key1;
    expect.assertions(1);
    try {
      await Places.autocomplete(null as any);
    } catch (error) {
      expect(error.message).toMatch('No parameters provided');
    }
  });

  it('should perform a successful autocomplete for Wrigley Field', async () => {
    const WRIGLEY_FIELD_PLACE_ID = 'ChIJId-a5bLTD4gRRtbdduE-6hw';
    Places.apiKey = MASTER_KEY;
    const places = await Places.autocomplete({ input: 'Wrigley Field' });
    const found:
      | GooglePlaceAutocompletePrediction
      | undefined = places.predictions.find(
      (place) => place.place_id === WRIGLEY_FIELD_PLACE_ID
    );
    expect(found).toBeDefined();
  });
});

describe('NearbySearch', () => {
  it('should throw an error for missing data', async () => {
    Places.apiKey = key1;
    expect.assertions(1);
    try {
      await Places.nearbysearch();
    } catch (error) {
      expect(error.message).toMatch('No parameters provided');
    }
  });

  it('should throw an error for missing data', async () => {
    Places.apiKey = key1;
    expect.assertions(1);
    try {
      await Places.nearbysearch({
        location: '-37.814,144.96332'
      } as any);
    } catch (error) {
      expect(error.message).toMatch('Missing required params: [radius]');
    }
  });

  it('should get a list of nearby results', async () => {
    Places.apiKey = MASTER_KEY;
    expect.assertions(1);
    try {
      const response = await Places.nearbysearch({
        location: '-37.814,144.96332',
        rankby: 'distance'
      });

      expect(response.results).toBeDefined();
    } catch (error) {
      fail();
    }
  });
});

describe('Query Autocomplete', () => {
  it('should throw an error for missing input', async () => {
    Places.apiKey = MASTER_KEY;
    try {
      await Places.queryautocomplete({ input: '' } as any);
    } catch (error) {
      expect(error.message).toMatch('Missing required params: [input]');
    }
  });
  it('should get results', async () => {
    Places.apiKey = MASTER_KEY;
    const response = await Places.queryautocomplete({
      input: 'Pizza in Chicago'
    });
    expect(response.predictions).toBeDefined();
  });
});

describe('textsearch', () => {
  it('should throw an error for missing query param', async () => {
    try {
      await Places.textsearch({ radius: 100 } as any);
    } catch (error) {
      expect(error.message).toMatch('Missing required params: [query]');
    }
  });

  it('should have results', async () => {
    try {
      Places.apiKey = MASTER_KEY;
      const response = await Places.textsearch({
        query: 'restaurants near chicago'
      });
      expect(response.results).toBeDefined();
    } catch (error) {
      fail();
    }
  });
});
