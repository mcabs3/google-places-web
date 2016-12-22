import Places, {permitParams} from '../GooglePlaces';
import {PARAMS} from '../GoogleConstants';

let fetch = jest.fn();
// fetch.Headers = Headers;
// fetch.Request = Request;
// fetch.Response = Response;
//
fetch.mockResponse = (body, init) => {
  fetch.mockImplementationOnce(() => Promise.resolve({json: () => Promise.resolve(body, init)}));
};

describe('Param Filtering', () => {
  const optionalKeys = ['radius'];

  const placeid = 'abcdefg12345';
  const input = '1234 Generic Lane';
  const radius = 2000;

  beforeEach(() => {
    Places.apiKey = null;
  });

  it('should throw an error for missing REQUIRED param definitions', () => {
    expect(() => permitParams({optionalKeys}, {placeid, input})).toThrowError('No required params defined');
  });

  it('should throw an error for missing params', () => {
    expect(() => permitParams({optionalKeys}, null)).toThrowError('Missing Params');
    expect(() => permitParams(PARAMS.AUTOCOMPLETE, null)).toThrowError('Missing Params');
    expect(() => permitParams(PARAMS.AUTOCOMPLETE, {})).toThrowError('Missing Params');

    expect(() => permitParams({optionalKeys: PARAMS.AUTOCOMPLETE.optionalKeys}, null)).toThrowError('Missing Params');
    expect(() => permitParams({optionalKeys: PARAMS.AUTOCOMPLETE.optionalKeys}, undefined)).toThrowError('Missing Params');
  });

  it('should throw an error for missing params that are REQUIRED', () => {
    expect(() => permitParams(PARAMS.DETAILS, {input})).toThrowError('Missing required params: [placeid]');
  });

  it('should filter params successfully', () => {
    expect(permitParams(PARAMS.DETAILS, {placeid, input})).toEqual({placeid});
    expect(permitParams(PARAMS.AUTOCOMPLETE, {input, radius, something: 'else'})).toEqual({input, radius});
  });
});


describe('API Key', () => {

  const key1 = 'TestKey';
  const key2 = '019494949494';
  const key3 = null;

  const invalidKey1 = 3030293949393;
  const invalidKey2 = 'asdfdfjfjd sjdfjd';


  it('should set the API Key', () => {
    Places.apiKey = key1;
    expect(Places.apiKey).toBe(key1);

    Places.apiKey = key2;
    expect(Places.apiKey).toBe(key2);

    Places.apiKey = key3;
    expect(Places.apiKey).toBe(key3);
  });

  it('should throw an error for invalid API Key', () => {
    expect(() => Places.apiKey = invalidKey1).toThrowError('Invalid API Key');
    expect(Places.apiKey).toBe(null);

    expect(() => Places.apiKey = invalidKey2).toThrowError('Invalid API Key');
    expect(Places.apiKey).toBe(null);
  });


  it('should throw an error for missing an address', () => {
    Places.apiKey = key1;
    expect(() => Places.autoComplete()).toThrowError('Missing partial address');
    expect(() => Places.autoComplete(null)).toThrowError('Missing partial address');
    expect(() => Places.autoComplete(undefined)).toThrowError('Missing partial address');
    expect(() => Places.autoComplete('')).toThrowError('Missing partial address');
  });

});