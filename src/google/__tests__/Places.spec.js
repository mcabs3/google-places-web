'use strict';
import Places from '../Places';

const key1 = 'TestKey';
const key2 = '019494949494';
const key3 = null;
const invalidKey1 = 3030293949393;
const invalidKey2 = 'asdfdfjfjd sjdfjd';

describe('API Key', () => {
  it('should set the API Key', () => {
    Places.apiKey = key1;
    expect(Places.apiKey).toBe(key1);

    Places.apiKey = key2;
    expect(Places.apiKey).toBe(key2);

    Places.apiKey = key3;
    expect(Places.apiKey).toBe(key3);
  });

  it('should throw an error for invalid API Key', () => {
    expect(() => Places.apiKey = invalidKey1).toThrow('Invalid API Key');
    expect(Places.apiKey).toBe(null);

    expect(() => Places.apiKey = invalidKey2).toThrow('Invalid API Key');
    expect(Places.apiKey).toBe(null);
  });
});

describe('Details', () => {
  it('should throw an error for missing data', () => {
    Places.apiKey = key1;
    expect(() => Places.details()).toThrow('No parameters provided');
    expect(() => Places.details(null)).toThrow('No parameters provided');
    expect(() => Places.details(undefined)).toThrow('No parameters provided');
    expect(() => Places.details({})).toThrow('Missing required params: [placeid]');
  });

  it('should successfully find Wrigley Field', async () => {
    Places.apiKey = key1;
    const WRIGLEY_FIELD_PLACE_ID = 'ChIJId-a5bLTD4gRRtbdduE-6hw';
    const wrigley = await Places.details({ placeid: WRIGLEY_FIELD_PLACE_ID });
    expect(wrigley).toBeDefined();

    const { types, url, geometry, name } = wrigley;
    expect(name).toBe('Wrigley Field');
    expect(url).toBe('https://maps.google.com/?cid=2083546915695089222');
    expect(types).toContain('stadium');
    expect(geometry.location).toEqual({ lat: 41.9484384, lng: -87.6553327 });
  });
});

describe('Auto Complete', () => {
  it('should throw an error for missing an address', () => {
    Places.apiKey = key1;
    expect(() => Places.autocomplete()).toThrow('No parameters provided');
    expect(() => Places.autocomplete(null)).toThrow('No parameters provided');
    expect(() => Places.autocomplete(undefined)).toThrow('No parameters provided');
    expect(() => Places.autocomplete('')).toThrow('No parameters provided');

    expect(() => Places.autocomplete({})).toThrow('Missing required params: [input]');
  });

  it('should perform a successful autocomplete for Wrigley Field', async () => {
    const WRIGLEY_FIELD_PLACE_ID = 'ChIJId-a5bLTD4gRRtbdduE-6hw';
    Places.apiKey = key1;
    const places = await Places.autocomplete({ input: 'Wrigley Field' });
    let found;
    for (let place of places) {
      if (place.place_id === WRIGLEY_FIELD_PLACE_ID) {
        found = place;
        break;
      }
    }
    expect(found).toBeDefined();
  });
});