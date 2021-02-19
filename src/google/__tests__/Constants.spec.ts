import { PlaceTypes, API } from '../constants';

describe('PlaceType', () => {
  it('should map correctly to Google entity', () => {
    expect(PlaceTypes.GEOCODE).toBe('geocode');
    expect(PlaceTypes.ADDRESS).toBe('address');
    expect(PlaceTypes.ESTABLISHMENT).toBe('establishment');
    expect(PlaceTypes.REGIONS).toBe('(regions)');
    expect(PlaceTypes.LOCALITY).toBe('locality');
    expect(PlaceTypes.SUBLOCALITY).toBe('sublocality');
    expect(PlaceTypes.POSTAL_CODE).toBe('postal_code');
    expect(PlaceTypes.COUNTRY).toBe('country');
    expect(PlaceTypes.ADMINISTRATIVE_AREA_LEVEL_1).toBe(
      'administrative_area_level_1'
    );
    expect(PlaceTypes.ADMINISTRATIVE_AREA_LEVEL_2).toBe(
      'administrative_area_level_2'
    );
    expect(PlaceTypes.CITIES).toBe('(cities)');
  });
});

describe('API', () => {
  describe('Nearby Search', () => {
    it('should return the default configuration', () => {
      expect(API.NEARBY_SEARCH({})).toEqual({
        optionalKeys: [
          'bounds',
          'keyword',
          'maxprice',
          'minprice',
          'name',
          'opennow',
          'rankby',
          'type',
          'pagetoken'
        ],
        path: 'nearbysearch',
        requiredKeys: ['location', 'radius']
      });
    });
    it('should return the new configuration if rankby is distance', () => {
      expect(API.NEARBY_SEARCH({ rankby: 'DISTANCE' })).toEqual({
        optionalKeys: [
          'bounds',
          'keyword',
          'maxprice',
          'minprice',
          'name',
          'opennow',
          'rankby',
          'type',
          'pagetoken'
        ],
        path: 'nearbysearch',
        requiredKeys: ['location']
      });

      expect(API.NEARBY_SEARCH({ rankby: 'distance' })).toEqual({
        optionalKeys: [
          'bounds',
          'keyword',
          'maxprice',
          'minprice',
          'name',
          'opennow',
          'rankby',
          'type',
          'pagetoken'
        ],
        path: 'nearbysearch',
        requiredKeys: ['location']
      });
    });
  });
});
