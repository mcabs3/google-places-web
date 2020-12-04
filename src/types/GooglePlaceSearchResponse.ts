export type PlacesStatusCode =
  | 'OK'
  | 'ZERO_RESULT'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'
  | 'UNKOWN_ERROR';

interface BaseGoogleResult {
  [key: string]: any;
}

/**
 * Object that has Latitude and Longitude coordinates
 */
export interface PlacesLatLng {
  lat: number;
  lng: number;
}

/**
 * Google Place Address Component Object
 */
export interface PlacesAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Google Place Photo Object
 */
export interface PlacesResultPhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

/**
 *
 */
export interface PlacesResultOpenHoursPeriod {
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
export interface PlacesResultReview {
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
export interface PlacesDetailsResult extends BaseGoogleResult {
  address_components: PlacesAddressComponent[];
  adr_address: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: PlacesLatLng;
    viewport?: {
      northeast: PlacesLatLng;
      southwest: PlacesLatLng;
    };
  };
  icon: string;
  id: string;
  international_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    weekday_text?: string[];
    periods?: PlacesResultOpenHoursPeriod[];
  };
  permanently_closed?: true;
  photos: PlacesResultPhoto[];
  place_id: string;
  plus_code?: {
    global_code: string;
    compound_code?: string;
  };
  rating: number;
  reference: string;
  reviews: PlacesResultReview[];
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
export interface PlacesAutoCompletePrediction
  extends Pick<PlacesSearchResult, 'id' | 'place_id' | 'reference' | 'types'>,
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
export interface PlacesSearchResult
  extends Pick<
      PlacesDetailsResult,
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
 * For internal or extending
 */
export interface GooglePlaceBaseResponse {
  html_attributions?: string[];
  status: PlacesStatusCode;
  // only included if there was an error
  error_message?: string;
  debug_log?: {
    line: any[];
  };
}
