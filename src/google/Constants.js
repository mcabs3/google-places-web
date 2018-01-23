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

export const API = {
  DETAILS: {
    path: 'details',
    requiredKeys: ['placeid'],
    optionalKeys: ['language']
  },
  AUTOCOMPLETE: {
    path: 'autocomplete',
    requiredKeys: ['input'],
    optionalKeys: ['offset', 'location', 'radius', 'language', 'types', 'strictbounds', 'components']
  },
  NEARBY_SEARCH: {
    path: 'nearbysearch',
    requiredKeys: ['location'],
    optionalKeys: [
      'radius',
      'keyword',
      'language',
      'minprice',
      'maxprice',
      'name',
      'opennow',
      'rankby',
      'type',
      'pagetoken',
      'region'
    ],
  },
  TEXT_SEARCH: {
    path: 'textsearch',
    requiredKeys: ['query'],
    optionalKeys: [
      'location',
      'radius',
      'language',
      'minprice',
      'maxprice',
      'opennow',
      'pagetoken',
      'type'
    ],
  },
  RADAR_SEARCH: {
    path: 'radarsearch',
    requiredKeys: ['location', 'radius'],
    optionalKeys: [
      'keyword',
      'language',
      'minprice',
      'maxprice',
      'name',
      'opennow',
      'type'
    ],
  }
};

