import { NearbySearch } from '../search/NearbySearch';
import { TextSearch } from '../search/TextSearch';
import { FindByTextSearch } from '../search/FindByTextSearch';
import { PlaceDetailsSearch } from '../search/PlaceDetailsSearch';
import { AutoCompleteSearch } from '../search/AutoCompleteSearch';
import { QueryAutoCompleteSearch } from '../search/QueryAutoCompleteSearch';

export class PlacesSearchFactory {
  private _api: string;

  constructor(apiKey: string) {
    this._api = apiKey;
  }

  public nearbysearch(): NearbySearch {
    const search = new NearbySearch();
    search.setApiKey(this._api);
    return search;
  }

  public findbytextsearch(): FindByTextSearch {
    const search = new FindByTextSearch();
    search.setApiKey(this._api);
    return search
  }

  public textsearch(): TextSearch {
    const search = new TextSearch();
    search.setApiKey(this._api);
    return search;
  }

  public detailsearch(): PlaceDetailsSearch {
    const search = new PlaceDetailsSearch();
    search.setApiKey(this._api);
    return search;
  }

  public autocomplete(): AutoCompleteSearch {
    const search = new AutoCompleteSearch();
    search.setApiKey(this._api);
    return search;
  }

  public queryautocomplete(): QueryAutoCompleteSearch {
    const search = new QueryAutoCompleteSearch();
    search.setApiKey(this._api);
    return search;
  }
}