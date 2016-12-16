import Places, {permitParams} from '../GooglePlaces';

describe('Param Filtering', () => {
  const requiredKeys = ['placeId'];
  const optionalKeys = ['radius'];

  const placeId = 'abcdefg12345';
  const input = '1234 Generic Lane';
  const radius = 2000;

  it('should throw an error for missing REQUIRED param definitions', () => {
    expect(() => permitParams({optionalKeys}, {placeId, input})).toThrowError('No required params defined');
  });

  it('should throw an error for missing params', () => {
    expect(() => permitParams({optionalKeys}, null)).toThrowError('Missing Params');
    expect(() => permitParams({requiredKeys, optionalKeys}, null)).toThrowError('Missing Params');
    expect(() => permitParams({requiredKeys, optionalKeys}, {})).toThrowError('Missing Params');

    expect(() => permitParams({optionalKeys}, null)).toThrowError('Missing Params');
    expect(() => permitParams({optionalKeys}, undefined)).toThrowError('Missing Params');
  });

  it('should throw an error for missing params that are REQUIRED', () => {
    expect(() => permitParams({
      requiredKeys,
      optionalKeys
    }, {input})).toThrowError('Missing required params: [placeId]');
  });

  it('should filter params successfully', () => {
    expect(permitParams({requiredKeys, optionalKeys}, {placeId, input})).toEqual({placeId});
    expect(permitParams({requiredKeys, optionalKeys}, {placeId, input, radius})).toEqual({placeId, radius});
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


  it('should throw an error', () => {
    expect(false).toBe(false);
  });

});