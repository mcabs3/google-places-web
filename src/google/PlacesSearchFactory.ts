import { NearbySearch } from '../search/NearbySearch';
import { TextSearch } from '../search/TextSearch';
import { FindByTextSearch } from '../search/FindByTextSearch';
import { PlaceDetailsSearch } from '../search/PlaceDetailsSearch';
import { AutoCompleteSearch } from '../search/AutoCompleteSearch';
import { QueryAutoCompleteSearch } from '../search/QueryAutoCompleteSearch';

export class PlacesSearchFactory {
  public nearbysearch(): NearbySearch {
    return new NearbySearch();
  }

  public findbytextsearch(): FindByTextSearch {
    return new FindByTextSearch();
  }

  public textsearch(): TextSearch {
    return new TextSearch();
  }

  public detailsearch(): PlaceDetailsSearch {
    return new PlaceDetailsSearch();
  }

  public autocomplete(): AutoCompleteSearch {
    return new AutoCompleteSearch();
  }

  public queryautocomplete(): QueryAutoCompleteSearch {
    return new QueryAutoCompleteSearch();
  }
}
