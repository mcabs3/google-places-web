export type PlacesDetailsField =
  | 'address_component'
  | 'adr_address'
  | 'formatted_address'
  | 'geometry'
  | 'icon'
  | 'name'
  | 'permanently_closed'
  | 'photo'
  | 'place_id'
  | 'plus_code'
  | 'type'
  | 'url'
  | 'utc_offset'
  | 'vicinity'

export type PlacesContactField =
  | 'formatted_phone_number'
  | 'international_phone_number'
  | 'opening_hours'
  | 'website'

export type PlacesAtmosphereField =
  | 'price_level'
  | 'rating'
  | 'review'
  | 'user_ratings_total'


export type PlacesField = PlacesDetailsField & PlacesContactField & PlacesAtmosphereField;

// export type PlacesSubsetField = Omit<PlacesField,
//   | 'address_component'
//   | 'adr_address'
//   | 'formatted_phone_number'
//   | 'international_phone_number'
//   | 'review'
//   | 'type'
//   | 'url'
//   | 'utc_offset'
//   | 'vicinity'>;