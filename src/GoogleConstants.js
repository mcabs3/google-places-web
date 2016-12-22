export const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/';

export const PlaceTypes = {
  GEOCODE: 'geocode',
  ADDRESS: 'address',
  ESTABLISHMENT: 'establishment',
  REGIONS: '(regions)',
  LOCALITY: 'locality',
  SUBLOCALITY: 'sublocality',
  POSTAL_CODE: 'postal_code',
  COUNTRY: 'country',
  ADMINISTRATIVE_AREA_LEVEL_1: 'administrative_area_level_1',
  ADMINISTRATIVE_AREA_LEVEL_2: 'administrative_area_level_2',
  CITIES: '(cities)'
};

export const PARAMS = {
  DETAILS: {
    requiredKeys: ['placeid'],
    optionalKeys: ['language']
  },
  AUTOCOMPLETE: {
    requiredKeys: ['input'],
    optionalKeys: ['offset', 'location', 'radius', 'languages', 'types', 'strictbounds']
  }
};

