export declare class GooglePlaces {
    private _apiKey?;
    private _debug;
    constructor(opts?: IGooglePlacesConfig);
    autocomplete: (opts: GooglePlacesOptions) => Promise<GooglePlaceAutocompleteResponse>;
    queryautocomplete: (opts: GooglePlacesOptions) => Promise<GooglePlaceQueryAutocompleteResponse>;
    details: (opts: GooglePlacesOptions) => Promise<GooglePlaceDetailsResponse>;
    nearbysearch: (opts?: GooglePlacesOptions) => Promise<GooglePlaceNearbySearchResponse>;
    textsearch: (opts?: GooglePlacesOptions) => Promise<GooglePlaceTextSearchResponse>;
    radarsearch: (opts?: GooglePlacesOptions) => Promise<GooglePlaceBaseResponse>;
    apiKey: string | undefined;
    debug: boolean;
    private _googleApiRequest;
    private _permitParams;
    private _log;
    private _query;
}
declare const _default: GooglePlaces;
export default _default;
