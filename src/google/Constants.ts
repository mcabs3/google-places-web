export const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/'

export const PlaceTypes = {
  ADDRESS: 'address',
  ADMINISTRATIVE_AREA_LEVEL_1: 'administrative_area_level_1',
  ADMINISTRATIVE_AREA_LEVEL_2: 'administrative_area_level_2',
  CITIES: '(cities)',
  COUNTRY: 'country',
  ESTABLISHMENT: 'establishment',
  GEOCODE: 'geocode',
  LOCALITY: 'locality',
  POSTAL_CODE: 'postal_code',
  REGIONS: '(regions)',
  SUBLOCALITY: 'sublocality'
}

export interface GoogleMapsApiOptions {
  readonly optionalKeys: string[]
  readonly requiredKeys: string[]
  readonly path: string
}

interface ApiMap {
  readonly [key: string]: (
    opts?: Record<string, unknown>
  ) => GoogleMapsApiOptions
}

export const API: ApiMap = {
  AUTOCOMPLETE: () => ({
    optionalKeys: [
      'components',
      'offset',
      'language',
      'location',
      'radius',
      'sessiontoken',
      'strictbounds',
      'types'
    ],
    path: 'autocomplete',
    requiredKeys: ['input']
  }),
  DETAILS: () => ({
    optionalKeys: ['language', 'sessiontoken', 'fields'],
    path: 'details',
    requiredKeys: ['placeid']
  }),
  NEARBY_SEARCH: (opts?: Record<string, unknown>) => {
    const path = 'nearbysearch'

    // if pagetoken is passed, all other params are to be ignored
    if (!!opts && !!opts.pagetoken) {
      return {
        optionalKeys: [],
        path,
        requiredKeys: ['pagetoken']
      }
    }

    const optionalKeys = [
      'bounds',
      'keyword',
      'maxprice',
      'minprice',
      'name',
      'opennow',
      'rankby',
      'type',
      'pagetoken'
    ]

    const requiredKeys = ['location']

    // If rankby is not DISTANCE, radius is required
    if (
      !opts ||
      !opts.rankby ||
      (typeof opts.rankby === 'string' &&
        opts.rankby.toUpperCase() !== 'DISTANCE')
    ) {
      requiredKeys.push('radius')
    }

    return {
      optionalKeys,
      path,
      requiredKeys
    }
  },
  RADAR_SEARCH: () => ({
    optionalKeys: [
      'keyword',
      'language',
      'minprice',
      'maxprice',
      'name',
      'opennow',
      'type'
    ],
    path: 'radarsearch',
    requiredKeys: ['location', 'radius']
  }),
  TEXT_SEARCH: () => ({
    optionalKeys: [
      'bounds',
      'location',
      'maxprice',
      'minprice',
      'opennow',
      'radius',
      'type',
      'pagetoken'
    ],
    path: 'textsearch',
    requiredKeys: ['query']
  })
}
