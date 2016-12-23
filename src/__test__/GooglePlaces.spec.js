'use strict';
import Places from '../GooglePlaces';
import {PARAMS} from '../GoogleConstants';

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




});

describe('Auto Complete', () => {
  const key1 = 'TestKey';
  const key2 = '019494949494';
  const key3 = null;

  const invalidKey1 = 3030293949393;
  const invalidKey2 = 'asdfdfjfjd sjdfjd';

  it('should throw an error for missing an address', () => {
    Places.apiKey = key1;
    expect(() => Places.autoComplete()).toThrowError('Missing required params: [input]');
    expect(() => Places.autoComplete(null)).toThrowError('Missing required params: [input]');
    expect(() => Places.autoComplete(undefined)).toThrowError('Missing required params: [input]');
    expect(() => Places.autoComplete('')).toThrowError('Missing required params: [input]');
  });
});