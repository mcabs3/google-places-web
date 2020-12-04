import { PlacesType } from 'types';

export interface PlacesRequest {
  key: string;
}

export interface PlacesPageTokenRequest {
  pagetoken?: string;
}

export interface PlacesRegionRequest {
  /**
   * ccTLD
   */
  region?: string;
}

export interface PlacesTypeRequest {
  type?: PlacesType;
}

export interface PlacesFieldsRequest {
  /**
   * https://developers.google.com/places/web-service/details#fields
   */
  fields?: string;
}
