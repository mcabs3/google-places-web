import { BaseSearch, Searchable } from "./BaseSearch";
import { PlacesRequest, PlacesTypeRequest, GooglePlaceBaseResponse, PlacesAutoCompletePrediction } from "../types";

export interface QueryAutoCompleteSearchRequest extends PlacesRequest, PlacesTypeRequest {
  input: string;
  offset?: number;
  /**
   * latitude,longitude
   */
  origin?: string;
  /**
   * latitude,longitude
   */
  location?: string;
  radius?: number;
  /**
   * Supported Languages: https://developers.google.com/maps/faq#languagesupport
   */
  language?: string;
  components?: string;
  strictbounds: boolean;
}

/**
 * HTTP body payload for a Place Query Autocomplete request
 */
export interface QueryAutoCompleteResponse extends GooglePlaceBaseResponse {
  predictions: PlacesAutoCompletePrediction[];
}

/**
 * Documentation: https://developers.google.com/places/web-service/autocomplete#place_autocomplete_requests
 */
export class QueryAutoCompleteSearch extends BaseSearch<QueryAutoCompleteSearchRequest> implements Searchable<QueryAutoCompleteResponse> {
  public async exec() {
    return await this.query('queryautocomplete');
  }
}