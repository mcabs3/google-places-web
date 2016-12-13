// @flow

export type ReactNativeGooglePlacesProps = {
  apiKey: ?string,
  log: boolean
};

export type PlaceDetailsResponse = {
  status: string,
  result: {}
};

export type AutocompleteResponse = {
  status: string,
  predictions: Array<{}>
};
