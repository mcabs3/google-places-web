import * as superagent from 'superagent';

import { GOOGLE_PLACES_API } from '../google/constants';
import { PlacesRequest } from 'types';

export interface Searchable<T> {
  exec(): Promise<T>;
}

export interface ValidatableSearch {
  isValid(): boolean;
}

export abstract class BaseSearch<T extends PlacesRequest>
  implements ValidatableSearch {
  protected _dev = false;
  protected _params = new Map<keyof T, any>();

  public setDev(dev: boolean) {
    this._dev = dev;
    return this;
  }

  public setApiKey(key: string) {
    this._params.set('key', key);
    return this;
  }

  public set<Key extends keyof T>(key: Key, value: T[Key]) {
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

  public getParamsAsObject() {
    const params = Array.from(this._params).reduce((obj: any, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    return params;
  }

  public isValid() {
    return true;
  }

  protected async query(url: string) {
    if (!this._params.has('key')) {
      throw new Error('no api key');
    }

    // only has api key
    if (this._params.size === 1) {
      throw new Error('no parameters provided');
    }

    const params = this.getParamsAsObject();
    const response = await superagent
      .get(`${GOOGLE_PLACES_API}/${url}/json`)
      .query({ key: this.get('key'), ...params });
    return response.body;
  }
}
