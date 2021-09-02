// import * as superagent from 'superagent';

// import { GOOGLE_PLACES_API } from '../google/constants';
import { PlacesRequest } from '../types';

export interface Searchable<T> {
  exec(): Promise<T>;
}

export interface ValidatableSearch {
  isValid(): boolean;
}

export type BaseSearchType =
  | 'queryautocomplete' // 'autocomplete
  | 'details'
  | 'nearbysearch'
  | 'findplacefromtext' //'findbytext'
  | 'textsearch';

export class BaseSearch<T extends PlacesRequest = PlacesRequest>
  implements ValidatableSearch {
  protected _dev = false;
  protected _params: Map<keyof T, T[keyof T]> = new Map();
  constructor(opts?: T) {
    if (opts) {
      if (typeof opts !== 'object') {
        throw new TypeError('search parameters are not an object');
      }

      // Load opts into internal params
      Object.keys(opts).forEach((key: string) =>
        this._params.set(key as keyof T, opts[key as keyof T])
      );
    }
  }

  public setDev(dev: boolean): BaseSearch<T> {
    this._dev = dev;
    return this;
  }

  public set<Key extends keyof T>(key: Key, value: T[Key]): BaseSearch<T> {
    this._params.set(key, value);
    return this;
  }

  public get<K extends keyof T>(key: K): T[K] | undefined {
    return this._params.get(key) as T[K] | undefined;
  }

  public remove<K extends keyof T>(key: K): boolean {
    if (this._params.has(key)) {
      this._params.delete(key);
      return true;
    }
    return false;
  }

  public toRequestJSON(): T {
    const params = Array.from(this._params).reduce(
      (obj: Record<string, unknown>, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {}
    );

    return params as T;
  }

  public isValid(): boolean {
    return true;
  }

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // protected async query(url: string): Promise<any> {
  //   if (!this._params.has('key')) {
  //     throw new Error('no api key');
  //   }

  //   // only has api key
  //   if (this._params.size === 1) {
  //     throw new Error('no parameters provided');
  //   }

  //   const params = this.toRequestJSON();
  //   const response = await superagent
  //     .get(`${GOOGLE_PLACES_API}/${url}/json`)
  //     .query({ ...params, key: this.get('key') });
  //   return response.body;
  // }
}
