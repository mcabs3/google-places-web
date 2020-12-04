import { BaseSearch, Searchable } from './BaseSearch';
import {
  PlacesRequest,
  PlacesRegionRequest,
  PlacesFieldsRequest,
  PlacesDetailsResult,
  GooglePlaceBaseResponse
} from '../types';

export interface PlaceDetailsSearchRequest
  extends PlacesRequest,
    PlacesRegionRequest,
    PlacesFieldsRequest {
  place_id: string;
  language?: string;
  sessiontoken?: string;
}

/**
 * HTTP body payload for a Place Details request
 */
export interface PlaceDetailsResponse extends GooglePlaceBaseResponse {
  result: PlacesDetailsResult;
}

export class PlaceDetailsSearch
  extends BaseSearch<PlaceDetailsSearchRequest>
  implements Searchable<PlaceDetailsResponse> {
  public async exec() {
    return await this.query('details');
  }
}
