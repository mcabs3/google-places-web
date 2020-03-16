import { Searchable, BaseSearch } from "./BaseSearch";
import { PlacesRequest, PlacesFieldsRequest, GooglePlaceBaseResponse, PlacesDetailsResult } from "../types";


export interface FindByTextSearchRequest extends PlacesRequest, PlacesFieldsRequest {
  input: string;
  inputtype: 'textquery' | 'phonenumber';
  language?: string;

  /**
   * point:lat,lng
   * circle:radius@lat,lng
   * rectangle:south,west|north,east
   */
  locationbias?: 'ipbias' | string;
}

export interface FindByTextSearchResponse extends GooglePlaceBaseResponse {
  candidates: PlacesDetailsResult[];
}

/**
 * Documentation: https://developers.google.com/places/web-service/search#FindPlaceRequests
 */
export class FindByTextSearch extends BaseSearch<FindByTextSearchRequest> implements Searchable<FindByTextSearchResponse> {
  public async exec() {
    return await this.query('findplacefromtext');
  }
}