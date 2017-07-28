import { PlaceTypes } from '../GoogleConstants';

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
    expect(PlaceTypes.ADMINISTRATIVE_AREA_LEVEL_1).toBe('administrative_area_level_1');
    expect(PlaceTypes.ADMINISTRATIVE_AREA_LEVEL_2).toBe('administrative_area_level_2');
    expect(PlaceTypes.CITIES).toBe('(cities)');
  });

});