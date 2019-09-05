/**
 * Configuration Options for the Constructor for GooglePlaces class
 */
declare interface IGooglePlacesConfig {
  apiKey?: string;
  debug: boolean;
}

/**
 * Internally used to pass the query parameter key/value paris
 */
declare interface GooglePlacesOptions {
  [key: string]: any;
}

/**
 * Internal use for details()
 */
declare interface GooglePlacesDetailsOpts extends GooglePlacesOptions {
  placeid: string;
  language?: string;
  sessiontoken?: string;
}

/**
 * Internal use for autocomplete()
 * Reference: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
 */
declare interface GooglePlacesAutocompleteOpts extends GooglePlacesOptions {
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
declare interface GooglePlacesQueryAutocompleteOpts extends GooglePlacesOptions {
  bounds?: string;
  components?: string;
  input: string;
  location?: string;
  offset?: number;
  radius?: number;
  sessiontoken?: string;
  types?: string[];
}

/**
 * Internal use for nearbysearch()
 * https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceSearchRequest
 */
declare interface GooglePlacesNearbySearchOpts extends GooglePlacesOptions {
  bounds?: string;
  keyword?: string;
  location: string;
  maxprice?: number;
  minprice?: number;
  name?: string;
  opennow?: boolean;
  pagetoken?: string;
  radius: number;
  rankby?: 'PROMINENCE' | 'DISTANCE';
  type?: string;
}

/**
 * Internal use for textsearch()
 * https://developers.google.com/maps/documentation/javascript/reference/places-service#TextSearchRequest
 */
declare interface GooglePlacesTextSearchOpts extends GooglePlacesOptions {
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
  [key: string]: any;
}

/**
 * Object that has Latitude and Longitude coordinates
 */
declare interface GooglePlaceLatLng {
  lat: number;
  lng: number;
}

/**
 * Google Place Address Component Object
 */
declare interface GooglePlaceAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Google Place Photo Object
 */
declare interface GooglePlaceResultPhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

/**
 * 
 */
declare interface GooglePlaceResultOpenHoursPeriod {
  close: {
    day: number; // 1
    time: string; // "1730"
  },
  open: {
    day: number;
    time: string;
  }
}

/**
 * A user review for a location
 */
declare interface GooglePlaceResultReview {
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
declare interface GooglePlaceDetailsResult extends BaseGoogleResult {
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
  }
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
declare interface GooglePlaceAutocompletePrediction extends Pick<GooglePlaceSearchResult, 'id' | 'place_id' | 'reference' | 'types'>, BaseGoogleResult {
  description: string;
  matched_substrings: [{ length: number, offset: number }];
  structured_formatting: { main_text: string, main_text_matched_substrings: string, secondary_text: string };
  terms: [{ offset: number, value: string }];
}

/**
 * A Google Place search result as JSON
 */
declare interface GooglePlaceSearchResult extends Pick<GooglePlaceDetailsResult, 'formatted_address' | 'geometry' | 'name' | 'opening_hours' | 'photos' | 'place_id' | 'plus_code' | 'rating' | 'id' | 'types' | 'scope' | 'user_ratings_total' | 'vicinity' | 'permanently_closed'>, BaseGoogleResult {
  price_level?: number;
  reference?: string; // in details?
}


/**
 * An API response code in the payload body.
 */
declare type GooglePlacesStatusCode = 'OK' | 'ZERO_RESULT' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKOWN_ERROR';

/**
 * For internal or extending
 */
declare interface GooglePlaceBaseResponse {
  html_attributions?: string[];
  status: GooglePlacesStatusCode;
  // only included if there was an error
  error_message?: string;
  debug_log?: {
    line: any[];
  }
}

/**
 * HTTP body payload for a Google Place search request
 */
declare interface GooglePlaceSearchResponse extends GooglePlaceBaseResponse {
  candidates: GooglePlaceSearchResult[];
}

/**
 * HTTP body payload for a Google Place Nearby search request
 */
declare interface GooglePlaceNearbySearchResponse extends GooglePlaceBaseResponse {
  html_attributions?: string[];
  next_page_token?: string;
  results: GooglePlaceSearchResult[];
}

/**
 * HTTP body payload for a Place Details request
 */
declare interface GooglePlaceDetailsResponse extends GooglePlaceBaseResponse {
  result: GooglePlaceDetailsResult;
}


declare type GooglePlaceTextSearchResult = Pick<GooglePlaceSearchResult, 'formatted_address' | 'geometry' | 'icon' | 'id' | 'name' | 'photos' | 'place_id' | 'reference' | 'types'>
/**
 * HTTP body payload for a Place Text search request
 */
declare interface GooglePlaceTextSearchResponse extends GooglePlaceBaseResponse {
  results: GooglePlaceTextSearchResult[];
}



/**
 * HTTP body payload for a Place Query Autocomplete request
 */
declare interface GooglePlaceQueryAutocompleteResponse extends GooglePlaceBaseResponse {
  predictions: GooglePlaceAutocompletePrediction[];
}


/**
 * HTTP body payload for a Place Autocomplete request
 */
declare interface GooglePlaceAutocompleteResponse extends GooglePlaceBaseResponse {
  predictions: GooglePlaceAutocompletePrediction[];
}