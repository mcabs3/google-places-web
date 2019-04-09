import * as superagent from "superagent";
import { API } from "./Constants";

const GOOGLE_MAPS_API_TARGET = "https://maps.googleapis.com/maps/api/place";

interface IGooglePlacesConfig {
  apiKey?: string;
  debug: boolean;
}

export interface GooglePlacesOptions {
  [key: string]: any;
}

export class GooglePlaces {
  private _apiKey?: string;
  private _debug: boolean = false;

  constructor(opts: IGooglePlacesConfig = { debug: false }) {
    const { apiKey, debug } = opts;
    this.apiKey = apiKey;
    this.debug = debug;
  }

  /**
   * Retrieves a list of predictions of a partial address
   */
  public autocomplete(opts: GooglePlacesOptions): Promise<any> {
    const params = this._permitParams(API.AUTOCOMPLETE, opts);
    return this._query(API.AUTOCOMPLETE.path, params).then(
      (res: any) => res.predictions
    );
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   */
  public details(opts: GooglePlacesOptions) {
    const params = this._permitParams(API.DETAILS, opts);
    return this._query(API.DETAILS.path, params).then(
      (json: any) => json.result
    );
  }

  /**
   * Google API Nearby Search
   */
  public nearbysearch(opts: GooglePlacesOptions = {}): Promise<any> {
    const params = this._permitParams(API.NEARBY_SEARCH, opts);
    return this._query(API.NEARBY_SEARCH.path, params).then(
      (res: any) => res.results
    );
  }

  /**
   * Google API Text Search
   */
  public textsearch(opts: GooglePlacesOptions = {}): Promise<any> {
    const params = this._permitParams(API.TEXT_SEARCH, opts);

    return this._query(API.TEXT_SEARCH.path, params).then(
      (res: any) => res.results
    );
  }

  /**
   * Google API Radar Search
   */
  public radarsearch(opts: GooglePlacesOptions = {}): Promise<any> {
    const params: any = this._permitParams(API.RADAR_SEARCH, opts);

    if (!params.name && !params.keyword && !params.type) {
      throw new Error("Missing required parameter: [keyword, name, or type]");
    }

    return this._query(API.RADAR_SEARCH.path, params).then(
      (res: any) => res.results
    );
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

  private _googleApiRequest(url: string, params: object) {
    const target = `${GOOGLE_MAPS_API_TARGET}${url}`;
    this._log(`GPW:REQ ${target}`, JSON.stringify({ ...params }));
    return superagent.get(target).query({ key: this.apiKey, ...params });
  }

  /**
   * Parse through a params object creating URI Components
   */
  private _permitParams(
    {
      requiredKeys,
      optionalKeys
    }: { requiredKeys: string[]; optionalKeys: string[] },
    params: any
  ): object {
    // Validate required keys are present
    if (!requiredKeys || !requiredKeys.length) {
      throw new Error("No required params defined");
    } else if (!params) {
      throw new Error("No parameters provided");
    }

    const missingKeys: string[] = [];

    // Filter required params
    const filteredRequiredParams = requiredKeys.reduce(
      (p: any, key: string) => {
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

    if (missingKeys.length) {
      throw new Error(`Missing required params: [${missingKeys.join(", ")}]`);
    }

    // Filter optional params
    const filteredOptionalParams = optionalKeys.reduce(
      (p: any, key: string) => {
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
  private async _query(path: string, params: object): Promise<any> {
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
      const { body } = response;
      this._log("GPW:RES", body);
      if (body.status !== "OK") {
        throw new Error(body.status);
      }
      return body;
    } catch (error) {
      throw error;
    }
  }
}

export default new GooglePlaces();
