interface IGooglePlacesConfig {
    apiKey?: string;
    debug: boolean;
}
export interface GooglePlacesOptions {
    [key: string]: any;
}
export declare class GooglePlaces {
    private _apiKey?;
    private _debug;
    constructor(opts?: IGooglePlacesConfig);
    autocomplete(opts: GooglePlacesOptions): Promise<any>;
    details(opts: GooglePlacesOptions): Promise<any>;
    nearbysearch(opts?: GooglePlacesOptions): Promise<any>;
    textsearch(opts?: GooglePlacesOptions): Promise<any>;
    radarsearch(opts?: GooglePlacesOptions): Promise<any>;
    apiKey: string | undefined;
    debug: boolean;
    private _googleApiRequest;
    private _permitParams;
    private _log;
    private _query;
}
declare const _default: GooglePlaces;
export default _default;
