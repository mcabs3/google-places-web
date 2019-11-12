import * as superagent from "superagent";
import { API } from "./Constants";
import { IGooglePlacesConfig, GooglePlacesQueryAutocompleteOpts, GooglePlaceAutocompleteResponse, GooglePlaceQueryAutocompleteResponse, GooglePlaceDetailsResponse, GooglePlacesDetailsOpts, GooglePlacesNearbySearchOpts, GooglePlaceNearbySearchResponse, GooglePlaceTextSearchResponse, GooglePlacesTextSearchOpts, GooglePlaceBaseResponse, GooglePlacesOptions } from "./types";

const GOOGLE_MAPS_API_TARGET = "https://maps.googleapis.com/maps/api/place";

interface GoogleResponse<T = any> extends superagent.Response {
  body: T
}

export class GooglePlaces {
  private _apiKey?: string;
  private _debug: boolean = false;

  constructor(opts: IGooglePlacesConfig = { debug: false }) {
    const { apiKey, debug } = opts;
    this.apiKey = apiKey;
    this.debug = debug;

    this._query = this._query.bind(this);
  }

  /**
   * Retrieves a list of predictions of a partial address
   */
  public autocomplete = async (opts?: GooglePlacesQueryAutocompleteOpts): Promise<GooglePlaceAutocompleteResponse> => {
    const params = this._permitParams(API.AUTOCOMPLETE, opts);
    const res = await this._query<GoogleResponse<GooglePlaceAutocompleteResponse>>(API.AUTOCOMPLETE.path, params);
    return res.body;
  }

  /**
   * Retrieves a list of predictions of a partial search
   *
   * ex. "Pizza in Chicago"
   */
  public queryautocomplete = async (opts?: GooglePlacesQueryAutocompleteOpts): Promise<GooglePlaceQueryAutocompleteResponse> => {
    const params = this._permitParams(API.AUTOCOMPLETE, opts);
    const res = await this._query<GoogleResponse<GooglePlaceQueryAutocompleteResponse>>(API.AUTOCOMPLETE.path, params);
    return res.body;
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   */
  public details = async (opts?: GooglePlacesDetailsOpts): Promise<GooglePlaceDetailsResponse> => {
    const params = this._permitParams(API.DETAILS, opts);
    const res = await this._query<GoogleResponse<GooglePlaceDetailsResponse>>(API.DETAILS.path, params);
    return res.body;
  }

  /**
   * Google API Nearby Search
   */
  public nearbysearch = async (opts?: GooglePlacesNearbySearchOpts): Promise<GooglePlaceNearbySearchResponse> => {
    const params = this._permitParams(API.NEARBY_SEARCH, opts);
    const res = await this._query<GoogleResponse<GooglePlaceNearbySearchResponse>>(API.NEARBY_SEARCH.path, params);
    return res.body;
  }

  /**
   * Google API Text Search
   */
  public textsearch = async (opts?: GooglePlacesTextSearchOpts): Promise<GooglePlaceTextSearchResponse> => {
    const params = this._permitParams(API.TEXT_SEARCH, opts);
    const res = await this._query<GoogleResponse<GooglePlaceTextSearchResponse>>(API.TEXT_SEARCH.path, params);
    return res.body;
  }

  /**
   * Google API Radar Search
   * @deprecated
   */
  public radarsearch = async (opts: GooglePlacesOptions = {}): Promise<GooglePlaceBaseResponse> => {
    const params: any = this._permitParams(API.RADAR_SEARCH, opts);

    if (!params.name && !params.keyword && !params.type) {
      throw new Error("Missing required parameter: [keyword, name, or type]");
    }

    const res = await this._query<GoogleResponse<any>>(API.RADAR_SEARCH.path, params);
    return res.body;
  }

  /**
   * Set the Google API Key from the Developer Console
   */
  set apiKey(apiKey: string | undefined) {
    if (apiKey && (typeof apiKey !== "string" || !apiKey.match(/^[^\s]+$/gi))) {
      throw new Error("Invalid API Key");
    }

    this._apiKey = apiKey;
  }

  get apiKey(): string | undefined {
    return this._apiKey;
  }

  /**
   * Set debugging mode which will log events
   * @param {boolean} isDebug true or false to enable debug mode
   */
  set debug(isDebug: boolean) {
    this._debug = isDebug;
  }

  private _googleApiRequest = async (url: string, params: object) => {
    const target = `${GOOGLE_MAPS_API_TARGET}${url}`;
    this._log(`GPW:REQ ${target}`, JSON.stringify({ ...params }));
    return await superagent.get(target).query({ key: this.apiKey, ...params });
  }

  /**
   * Parse through a params object creating URI Components
   */
  private _permitParams = (
    {
      requiredKeys,
      optionalKeys
    }: { requiredKeys: string[]; optionalKeys: string[] },
    params?: GooglePlacesOptions
  ): object => {
    // Validate required keys are present
    if (!requiredKeys || !requiredKeys.length) {
      throw new Error("No required params defined");
    } else if (!params || Object.keys(params).length === 0) {
      throw new Error("No parameters provided");
    }

    const missingKeys: string[] = [];

    // Filter required params
    const filteredRequiredParams = requiredKeys.reduce(
      (p: GooglePlacesOptions, key: string) => {
        const param: string = params[key];
        if (param) {
          p[key] = param;
        } else {
          missingKeys.push(key);
        }
        return p;
      },
      {}
    );

    if (missingKeys.length > 0) {
      throw new Error(`Missing required params: [${missingKeys.join(", ")}]`);
    }

    // Filter optional params
    const filteredOptionalParams = optionalKeys.reduce(
      (p: GooglePlacesOptions, key: string) => {
        const param = params[key];
        if (param) {
          p[key] = param;
        }
        return p;
      },
      {}
    );

    this._log("GPW:PARAMS", JSON.stringify(params));
    return { ...filteredOptionalParams, ...filteredRequiredParams };
  }

  /**
   * Logs messages based on the _debug
   */
  private _log(title: string, message: any): void {
    if (this._debug) {
      // tslint:disable-next-line
      console.log(title, message);
    }
  }

  /**
   * Performs the HTTP Request
   */
  private async _query<T extends superagent.Response>(path: string, params: object): Promise<T> {
    if (!this._apiKey) {
      throw new Error("Invalid API key");
    } else if (!path) {
      throw new Error("Google API path is required");
    } else if (!params) {
      throw new Error("Missing params");
    }

    try {
      const response: superagent.Response = await this._googleApiRequest(
        `/${path}/json`,
        params
      );
      const body = response.body;
      this._log("GPW:RES", body);
      if (body.status !== "OK") {
        throw new Error(body.status);
      }
      return response as T;
    } catch (error) {
      throw error;
    }
  }
}

export default new GooglePlaces();
