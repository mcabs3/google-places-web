import * as superagent from 'superagent';
import { API } from './constants';
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
  GooglePlacesOptions
} from '../types';
import {
  AutoCompleteSearchRequest,
  BaseSearch,
  FindByTextSearchRequest,
  NearbySearchRequest,
  PlaceDetailsSearchRequest,
  TextSearchRequest
} from '../search';

export const GOOGLE_MAPS_API_TARGET =
  'https://maps.googleapis.com/maps/api/place';

interface GoogleResponse<T> extends superagent.Response {
  body: T;
}

export class GooglePlaces {
  private _apiKey?: string;
  private _debug = false;

  constructor(opts: IGooglePlacesConfig = { debug: false }) {
    const { apiKey, debug } = opts;
    this.apiKey = apiKey;
    this.debug = debug;

    this._query = this._query.bind(this);
  }

  async query(
    type: 'queryautocomplete',
    opts: AutoCompleteSearchRequest
  ): Promise<superagent.Response>;
  async query(
    type: 'nearbysearch',
    opts: NearbySearchRequest
  ): Promise<superagent.Response>;
  async query(
    type: 'textsearch',
    opts: TextSearchRequest
  ): Promise<superagent.Response>;
  async query(
    type: 'details',
    opts: PlaceDetailsSearchRequest
  ): Promise<superagent.Response>;
  async query(
    type: 'findplacefromtext',
    opts: FindByTextSearchRequest
  ): Promise<superagent.Response>;
  async query(type: never, opts: never): Promise<superagent.Response> {
    if (!opts || Object.keys(opts).length === 0) {
      throw new Error('no parameters');
    }
    const search = new BaseSearch(opts);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this._query(type, search.toRequestJSON() as any);
  }

  /**
   * Retrieves a list of predictions of a partial address
   */
  public async autocomplete(
    opts?: GooglePlacesQueryAutocompleteOpts
  ): Promise<GooglePlaceAutocompleteResponse> {
    const config = API.AUTOCOMPLETE(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<
      GoogleResponse<GooglePlaceAutocompleteResponse>
    >(config.path, params);
    return res.body;
  }

  /**
   * Retrieves a list of predictions of a partial search
   *
   * ex. "Pizza in Chicago"
   */
  public async queryautocomplete(
    opts?: GooglePlacesQueryAutocompleteOpts
  ): Promise<GooglePlaceQueryAutocompleteResponse> {
    const config = API.AUTOCOMPLETE(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<
      GoogleResponse<GooglePlaceQueryAutocompleteResponse>
    >(config.path, params);
    return res.body;
  }

  /**
   * Retrieve the details of a Google Place based on the Place ID
   */
  public async details(
    opts?: GooglePlacesDetailsOpts
  ): Promise<GooglePlaceDetailsResponse> {
    const config = API.DETAILS(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<GoogleResponse<GooglePlaceDetailsResponse>>(
      config.path,
      params
    );
    return res.body;
  }

  /**
   * Google API Nearby Search
   */
  public async nearbysearch(
    opts?: GooglePlacesNearbySearchOpts
  ): Promise<GooglePlaceNearbySearchResponse> {
    if (opts && opts.rankby && opts.rankby.toUpperCase() === 'DISTANCE') {
      // Remove radius option if "rankBy" is set to "DISTANCE"
      opts.radius = undefined;
    }

    const config = API.NEARBY_SEARCH(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<
      GoogleResponse<GooglePlaceNearbySearchResponse>
    >(config.path, params);
    return res.body;
  }

  /**
   * Google API Text Search
   */
  public async textsearch(
    opts?: GooglePlacesTextSearchOpts
  ): Promise<GooglePlaceTextSearchResponse> {
    const config = API.TEXT_SEARCH(opts);
    const params = this._permitParams(config, opts);
    const res = await this._query<
      GoogleResponse<GooglePlaceTextSearchResponse>
    >(config.path, params);
    return res.body;
  }

  /**
   * Set the Google API Key from the Developer Console
   */
  set apiKey(apiKey: string | undefined) {
    if (apiKey && (typeof apiKey !== 'string' || !apiKey.match(/^[^\s]+$/gi))) {
      throw new Error('Invalid API Key');
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

  private async _googleApiRequest(
    url: string,
    params: Record<string, unknown>
  ) {
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
  ): Record<string, unknown> => {
    // Validate required keys are present
    if (!requiredKeys || !requiredKeys.length) {
      throw new Error('No required params defined');
    } else if (!params || Object.keys(params).length === 0) {
      throw new Error('No parameters provided');
    }

    const missingKeys: string[] = [];

    // Filter required params
    const filteredRequiredParams = requiredKeys.reduce(
      (p: GooglePlacesOptions, key: string) => {
        const param: string = params[key] as string;
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
      throw new Error(`Missing required params: [${missingKeys.join(', ')}]`);
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

    this._log('GPW:PARAMS', JSON.stringify(params));
    return { ...filteredOptionalParams, ...filteredRequiredParams };
  };

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
   * Performs the HTTP Request
   */
  private async _query<T extends superagent.Response>(
    path: string,
    params: Record<string, unknown>
  ): Promise<T> {
    if (!this._apiKey) {
      throw new Error('Invalid API key');
    } else if (!path) {
      throw new Error('Google API path is required');
    } else if (!params) {
      throw new Error('Missing params');
    }

    params.key = this.apiKey;

    const response: superagent.Response = await this._googleApiRequest(
      `/${path}/json`,
      params
    );
    const body = response.body;
    this._log('GPW:RES', body);
    if (body.status !== 'OK') {
      throw new Error(body.status);
    }
    return response as T;
  }
}

export default new GooglePlaces();
