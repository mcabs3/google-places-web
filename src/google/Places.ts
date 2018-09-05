import axios, { AxiosResponse } from "axios";
import QueryString from "query-string";
import { API } from "./Constants";

const placesAxios = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place"
});

interface IGooglePlacesConfig {
  apiKey?: string;
  debug?: boolean;
}

export class GooglePlaces {
  // tslint:disable-next-line
  private _apiKey?: string;

  // tslint:disable-next-line
  private _debug: boolean = false;

  constructor(opts: IGooglePlacesConfig = {}) {
    const { apiKey, debug } = opts;
    this.apiKey = apiKey;
    this.debug = debug;
  }

  /**
   * Retrieves a list of predictions of a partial address
   */
  public autocomplete(opts): Promise<any> {
    const params = this._permitParams(API.AUTOCOMPLETE, opts);
    return this._query(API.AUTOCOMPLETE.path, params).then(
      (res: any) => res.predictions
    );
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   */
  public details(opts) {
    const params = this._permitParams(API.DETAILS, opts);
    return this._query(API.DETAILS.path, params).then(
      (json: any) => json.result
    );
  }

  /**
   * Google API Nearby Search
   */
  public nearbysearch(opts = {}): Promise<any> {
    const params = this._permitParams(API.NEARBY_SEARCH, opts);
    return this._query(API.NEARBY_SEARCH.path, params).then(
      (res: any) => res.results
    );
  }

  /**
   * Google API Text Search
   */
  public textsearch(opts = {}): Promise<any> {
    const params = this._permitParams(API.TEXT_SEARCH, opts);

    return this._query(API.TEXT_SEARCH.path, params).then(
      (res: any) => res.results
    );
  }

  /**
   * Google API Radar Search
   */
  public radarsearch(opts = {}): Promise<any> {
    const params = this._permitParams(API.RADAR_SEARCH, opts);

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
  set apiKey(apiKey: string) {
    if (apiKey && (typeof apiKey !== "string" || !apiKey.match(/^[^\s]+$/gi))) {
      throw new Error("Invalid API Key");
    }

    this._apiKey = apiKey;
  }

  get apiKey(): string {
    return this._apiKey;
  }

  /**
   * Set debugging mode which will log events
   * @param {boolean} isDebug true or false to enable debug mode
   */
  set debug(isDebug: boolean) {
    this._debug = isDebug;
  }

  /**
   * Parse through a params object creating URI Components
   */
  private _permitParams(
    {
      requiredKeys,
      optionalKeys
    }: { requiredKeys: string[]; optionalKeys: string[] },
    params: object
  ): object {
    // Validate required keys are present
    if (!requiredKeys || !requiredKeys.length) {
      throw new Error("No required params defined");
    } else if (!params) {
      throw new Error("No parameters provided");
    }

    const missingKeys: string[] = [];

    // Filter required params
    const filteredRequiredParams = requiredKeys.reduce((p, key: string) => {
      const param: string = params[key];
      if (param) {
        p[key] = param;
      } else {
        missingKeys.push(key);
      }
      return p;
    }, {});

    if (missingKeys.length) {
      throw new Error(`Missing required params: [${missingKeys.join(", ")}]`);
    }

    // Filter optional params
    const filteredOptionalParams = optionalKeys.reduce((p, key: string) => {
      const param = params[key];
      if (param) {
        p[key] = param;
      }
      return p;
    }, {});

    this._log("google-places-web (params)", JSON.stringify(params));
    return { ...filteredOptionalParams, ...filteredRequiredParams };
  }

  /**
   * Logs messages based on the _debug
   */
  private _log(title: string, message: string): void {
    if (this._debug) {
      // tslint:disable-next-line
      console.log(title, message);
    }
  }

  /**
   * helper method to build the query uri
   */
  private _buildUri(path: string, params: any): string {
    if (!this._apiKey) {
      throw new Error("Invalid API key");
    } else if (!path) {
      throw new Error("Google API path is required");
    } else if (!params) {
      throw new Error("Missing params");
    }

    const uri = [`/${path}/json`, `?key=${this._apiKey}`].join("");

    const parts = QueryString.stringify(params);
    const query = `${uri}&${parts}`;
    this._log("google-places-web (query)", query);
    return query;
  }

  /**
   * Performs the HTTP Request
   */
  private _query(path: string, params: object): Promise<any> {
    const query = this._buildUri(path, params);
    return placesAxios
      .get(query)
      .then((response: AxiosResponse) => {
        const { data } = response;
        this._log("google-places-web (data)", data);
        if (data.status !== "OK") {
          throw new Error(data.status);
        }
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}

export default new GooglePlaces();
