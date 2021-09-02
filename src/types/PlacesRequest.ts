import { PlacesType } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlacesRequest {}

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
