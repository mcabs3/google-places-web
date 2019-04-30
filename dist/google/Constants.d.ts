export declare const GOOGLE_PLACES_API = "https://maps.googleapis.com/maps/api/place/";
export declare const PlaceTypes: {
    ADDRESS: string;
    ADMINISTRATIVE_AREA_LEVEL_1: string;
    ADMINISTRATIVE_AREA_LEVEL_2: string;
    CITIES: string;
    COUNTRY: string;
    ESTABLISHMENT: string;
    GEOCODE: string;
    LOCALITY: string;
    POSTAL_CODE: string;
    REGIONS: string;
    SUBLOCALITY: string;
};
export interface GoogleMapsApiOptions {
    readonly optionalKeys: string[];
    readonly requiredKeys: string[];
    readonly path: string;
}
interface ApiMap {
    readonly [key: string]: GoogleMapsApiOptions;
}
export declare const API: ApiMap;
export {};
