import { BaseSearch, Searchable } from "./BaseSearch";
import { PlacesRequest, PlacesTypeRequest, GooglePlaceBaseResponse, PlacesAutoCompletePrediction } from "../types";

export interface AutoCompleteSearchRequest extends PlacesRequest, PlacesTypeRequest {
  input: string;
  sessiontoken?: string;
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
 * HTTP body payload for a Place Autocomplete request
 */
export interface AutoCompleteResponse extends GooglePlaceBaseResponse {
  predictions: PlacesAutoCompletePrediction[];
}

/**
 * Documentation: https://developers.google.com/places/web-service/autocomplete#place_autocomplete_requests
 */
export class AutoCompleteSearch extends BaseSearch<AutoCompleteSearchRequest> implements Searchable<AutoCompleteResponse>{
  public async exec() {
    return await this.query('autocomplete');
  }
}