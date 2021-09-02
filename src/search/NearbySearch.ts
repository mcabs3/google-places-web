import { BaseSearch } from './BaseSearch';
import {
  PlacesPageTokenRequest,
  PlacesRequest,
  PlacesTypeRequest,
  GooglePlaceBaseResponse,
  PlacesSearchResult
} from '../types';

interface BaseNearbySearchRequest
  extends PlacesPageTokenRequest,
    PlacesRequest,
    PlacesTypeRequest {
  // longitude,latitude
  location: string;
  keyword?: string;
  language?: string;
  minprice?: number;
  maxprice?: number;
  name?: string;
  opennow?: boolean;
}

interface NearbySearchWithRadiusByRequest extends BaseNearbySearchRequest {
  /**
   * Max 50,000
   * No included if rankby=distance
   */
  radius: number;
  rankby: never;
}

interface NearbySearchWithRankByRequest extends BaseNearbySearchRequest {
  /**
   * When distance: keyword, name or type must be defined
   */
  rankby?: 'prominence' | 'distance';
  radius: never;
}

export type NearbySearchRequest =
  | NearbySearchWithRankByRequest
  | NearbySearchWithRadiusByRequest;

/**
 * HTTP body payload for a Google Place Nearby search request
 */
export interface NearbySearchResponse extends GooglePlaceBaseResponse {
  next_page_token?: string;
  results: PlacesSearchResult[];
}

/**
 * Documentation: https://developers.google.com/places/web-service/search#PlaceSearchRequests
 */
export class NearbySearch extends BaseSearch<NearbySearchRequest> {
  isValid(): boolean {
    const rankby = this.get('rankby');
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!rankby) {
      if (this._params.has('radius')) {
        throw new Error('`radius` and `rankby` are present.');
      }
    }

    if (this._params.has('pagetoken')) {
      console.log('pagetoken provided: params will be ignored');
    }

    return true;
  }
}
