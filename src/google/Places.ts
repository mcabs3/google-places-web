import * as superagent from "superagent";
import { API } from "./Constants";
import {
  IGooglePlacesConfig,
  GooglePlacesQueryAutocompleteOpts,
  GooglePlaceAutocompleteResponse,
  GooglePlaceQueryAutocompleteResponse,
  GooglePlaceDetailsResponse,
  GooglePlacesDetailsOpts,
  GooglePlacesNearbySearchOpts,
  GooglePlaceNearbySearchResponse,
  GooglePlaceTextSearchResponse,
  GooglePlacesTextSearchOpts,
  GooglePlacesOptions,
  GooglePlacesFindPlaceSearchOpts,
  GooglePlaceFindPlaceSearchResponse,
} from "./google";
import { GooglePlaceBaseResponse } from "types";

export const GOOGLE_MAPS_API_TARGET = "https://maps.googleapis.com/maps/api/place";

interface GoogleResponse<T = any> extends superagent.Response {
  body: T
}

/**
 * @deprecated
 */
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
    const config = API.AUTOCOMPLETE(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceAutocompleteResponse>>(config.path, params);
    return res.body;
  }

  /**
   * Retrieves a list of predictions of a partial search
   *
   * ex. "Pizza in Chicago"
   */
  public queryautocomplete = async (opts?: GooglePlacesQueryAutocompleteOpts): Promise<GooglePlaceQueryAutocompleteResponse> => {
    const config = API.AUTOCOMPLETE(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceQueryAutocompleteResponse>>(config.path, params);
    return res.body;
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   */
  public details = async (opts?: GooglePlacesDetailsOpts): Promise<GooglePlaceDetailsResponse> => {
    const config = API.DETAILS(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceDetailsResponse>>(config.path, params);
    return res.body;
  }

  /**
   * Google API Nearby Search
   */
  public nearbysearch = async (opts?: GooglePlacesNearbySearchOpts): Promise<GooglePlaceNearbySearchResponse> => {
    if (opts && opts.rankby && opts.rankby.toUpperCase() === 'DISTANCE') {
      // Remove radius option if "rankBy" is set to "DISTANCE"
      opts.radius = undefined;
    }

    const config = API.NEARBY_SEARCH(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceNearbySearchResponse>>(config.path, params);
    return res.body;
  }

  /**
   * Google API Find Place Search
   * @deprecated
   */
  public findPlaceSearch = async (opts?: GooglePlacesFindPlaceSearchOpts): Promise<GooglePlaceFindPlaceSearchResponse> => {
    const config = API.FIND_PLACE_SEARCH(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceFindPlaceSearchResponse>>(config.path, params);
    return res.body;
  }

  /**
   * Google API Text Search
   */
  public textsearch = async (opts?: GooglePlacesTextSearchOpts): Promise<GooglePlaceTextSearchResponse> => {
    const config = API.TEXT_SEARCH(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceTextSearchResponse>>(config.path, params);
    return res.body;
  }

  /**
   * Google API Radar Search
   * @deprecated
   */
  public radarsearch = async (opts: GooglePlacesOptions = {}): Promise<GooglePlaceBaseResponse> => {
    const config = API.RADAR_SEARCH(opts);
    const params: any = this._permitParams(config, opts);

    if (!params.name && !params.keyword && !params.type) {
      throw new Error("Missing required parameter: [keyword, name, or type]");
    }

    const res = await this._query<GoogleResponse<any>>(config.path, params);
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
