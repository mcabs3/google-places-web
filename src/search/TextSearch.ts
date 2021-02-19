import { Searchable, BaseSearch } from './BaseSearch';
import {
  GooglePlaceBaseResponse,
  PlacesSearchResult,
  PlacesRequest,
  PlacesPageTokenRequest,
  PlacesRegionRequest
} from '../types';

interface BaseTextSearchRequest
  extends PlacesPageTokenRequest,
    PlacesRequest,
    PlacesRegionRequest {
  query: string;

  /**
   * "en"
   */
  language: string;
  minprice: number;
  maxprice: number;
  opennow: boolean;
  /**
   * Supported Types: https://developers.google.com/places/web-service/supported_types
   */
  type?: string;
}

interface TextSearchWithoutLocationRequest extends BaseTextSearchRequest {
  location: never;
  radius?: number;
}

interface TextSearchWithLocationRequest extends BaseTextSearchRequest {
  location: string;
  radius: number;
}

export type TextSearchRequest =
  | TextSearchWithoutLocationRequest
  | TextSearchWithLocationRequest;

export type TextSearchResult = Pick<
  PlacesSearchResult,
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
export interface TextSearchResponse extends GooglePlaceBaseResponse {
  results: TextSearchResult[];
}

/**
 * Documentation: https://developers.google.com/places/web-service/search#TextSearchRequests
 */
export class TextSearch
  extends BaseSearch<TextSearchRequest>
  implements Searchable<TextSearchResponse> {
  public async exec() {
    if (this._params.has('location') && !this._params.has('radius')) {
      throw new Error('radius is required when location is provided');
    }
    return await this.query('textsearch');
  }
}
