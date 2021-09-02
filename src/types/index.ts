import { GooglePlaceBaseResponse } from './GooglePlaceSearchResponse';

export * from './GooglePlaceSearchResponse';
export * from './PlacesType';
export * from './PlacesField';
export * from './PlacesRequest';

/**
 * Configuration Options for the Constructor for GooglePlaces class
 */
export interface IGooglePlacesConfig {
  apiKey?: string;
  debug: boolean;
}

/**
 * Internally used to pass the query parameter key/value paris
 */
export interface GooglePlacesOptions {
  [key: string]: unknown;
}

/**
 * Internal use for details()
 */
export interface GooglePlacesDetailsOpts extends GooglePlacesOptions {
  placeid: string;
  language?: string;
  sessiontoken?: string;
  fields?: string;
}

/**
 * Internal use for autocomplete()
 * Reference: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
 */
export interface GooglePlacesAutocompleteOpts extends GooglePlacesOptions {
  components?: string;
  input: string;
  offset?: number;
  language?: string;
  location?: string; // lat,long
  radius?: number;
  sessiontoken?: string;
  strictbounds?: boolean;
  types?: string[];
}

/**
 * Internal use for queryAutocomplete()
 * Reference: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletePrediction
 */
export interface GooglePlacesQueryAutocompleteOpts extends GooglePlacesOptions {
  bounds?: string;
  components?: string;
  input: string;
  location?: string;
  offset?: number;
  radius?: number;
  sessiontoken?: string;
  types?: string[];
}

// DO NOT USE
export interface BaseGooglePlacesNearbySearch extends GooglePlacesOptions {
  bounds?: string;
  keyword?: string;
  location: string;
  maxprice?: number;
  minprice?: number;
  name?: string;
  opennow?: boolean;
  pagetoken?: string;
  type?: string;
  rankby?: 'prominence' | 'distance';
}

/**
 * Internal use for nearbysearch()
 * https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceSearchRequest
 */
export type GooglePlacesNearbySearchOpts = BaseGooglePlacesNearbySearch &
  (
    | {
        rankby: 'distance';
        radius?: undefined;
      }
    | {
        rankby?: 'prominence';
        radius: number;
      }
  );

/**
 * Internal use for textsearch()
 * https://developers.google.com/maps/documentation/javascript/reference/places-service#TextSearchRequest
 */
export interface GooglePlacesTextSearchOpts extends GooglePlacesOptions {
  bounds?: string;
  location?: string;
  maxprice?: number;
  minprice?: number;
  opennow?: boolean;
  query: string;
  radius?: number;
  type?: string;
}

interface BaseGoogleResult {
  [key: string]: unknown;
}

/**
 * Object that has Latitude and Longitude coordinates
 */
export interface GooglePlaceLatLng {
  lat: number;
  lng: number;
}

/**
 * Google Place Address Component Object
 */
export interface GooglePlaceAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Google Place Photo Object
 */
export interface GooglePlaceResultPhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

/**
 *
 */
export interface GooglePlaceResultOpenHoursPeriod {
  close: {
    day: number; // 1
    time: string; // "1730"
  };
  open: {
    day: number;
    time: string;
  };
}

/**
 * A user review for a location
 */
export interface GooglePlaceResultReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

/**
 * The Place Details result in the HTTP body
 */
export interface GooglePlaceDetailsResult extends BaseGoogleResult {
  address_components: GooglePlaceAddressComponent[];
  adr_address: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: GooglePlaceLatLng;
    viewport?: {
      northeast: GooglePlaceLatLng;
      southwest: GooglePlaceLatLng;
    };
  };
  icon: string;
  id: string;
  international_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    weekday_text?: string[];
    periods?: GooglePlaceResultOpenHoursPeriod[];
  };
  permanently_closed?: true;
  photos: GooglePlaceResultPhoto[];
  place_id: string;
  plus_code?: {
    global_code: string;
    compound_code?: string;
  };
  rating: number;
  reference: string;
  reviews: GooglePlaceResultReview[];
  scope?: string;
  types: string[];
  url?: string;
  user_ratings_total?: number;
  utc_offset: number;
  vicinity?: string;
  website?: string;
}

/**
 *
 */
export interface GooglePlaceAutocompletePrediction
  extends Pick<
      GooglePlaceSearchResult,
      'id' | 'place_id' | 'reference' | 'types'
    >,
    BaseGoogleResult {
  description: string;
  matched_substrings: [{ length: number; offset: number }];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: string;
    secondary_text: string;
  };
  terms: [{ offset: number; value: string }];
}

/**
 * A Google Place search result as JSON
 */
export interface GooglePlaceSearchResult
  extends Pick<
      GooglePlaceDetailsResult,
      | 'formatted_address'
      | 'geometry'
      | 'name'
      | 'opening_hours'
      | 'photos'
      | 'place_id'
      | 'plus_code'
      | 'rating'
      | 'id'
      | 'types'
      | 'scope'
      | 'user_ratings_total'
      | 'vicinity'
      | 'permanently_closed'
    >,
    BaseGoogleResult {
  price_level?: number;
  reference?: string; // in details?
}

/**
 * An API response code in the payload body.
 */
export type GooglePlacesStatusCode =
  | 'OK'
  | 'ZERO_RESULT'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'
  | 'UNKOWN_ERROR';

/**
 * HTTP body payload for a Google Place Nearby search request
 */
export interface GooglePlaceNearbySearchResponse
  extends GooglePlaceBaseResponse {
  html_attributions?: string[];
  next_page_token?: string;
  results: GooglePlaceSearchResult[];
}

/**
 * HTTP body payload for a Place Details request
 */
export interface GooglePlaceDetailsResponse extends GooglePlaceBaseResponse {
  result: GooglePlaceDetailsResult;
}

export type GooglePlaceTextSearchResult = Pick<
  GooglePlaceSearchResult,
  | 'formatted_address'
  | 'geometry'
  | 'icon'
  | 'id'
  | 'name'
  | 'photos'
  | 'place_id'
  | 'reference'
  | 'types'
>;

/**
 * HTTP body payload for a Place Text search request
 */
export interface GooglePlaceTextSearchResponse extends GooglePlaceBaseResponse {
  results: GooglePlaceTextSearchResult[];
}

/**
 * HTTP body payload for a Place Query Autocomplete request
 */
export interface GooglePlaceQueryAutocompleteResponse
  extends GooglePlaceBaseResponse {
  predictions: GooglePlaceAutocompletePrediction[];
}

/**
 * HTTP body payload for a Place Autocomplete request
 */
export interface GooglePlaceAutocompleteResponse
  extends GooglePlaceBaseResponse {
  predictions: GooglePlaceAutocompletePrediction[];
}
