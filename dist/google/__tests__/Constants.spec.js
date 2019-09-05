"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
describe('PlaceType', () => {
    it('should map correctly to Google entity', () => {
        expect(Constants_1.PlaceTypes.GEOCODE).toBe('geocode');
        expect(Constants_1.PlaceTypes.ADDRESS).toBe('address');
        expect(Constants_1.PlaceTypes.ESTABLISHMENT).toBe('establishment');
        expect(Constants_1.PlaceTypes.REGIONS).toBe('(regions)');
        expect(Constants_1.PlaceTypes.LOCALITY).toBe('locality');
        expect(Constants_1.PlaceTypes.SUBLOCALITY).toBe('sublocality');
        expect(Constants_1.PlaceTypes.POSTAL_CODE).toBe('postal_code');
        expect(Constants_1.PlaceTypes.COUNTRY).toBe('country');
        expect(Constants_1.PlaceTypes.ADMINISTRATIVE_AREA_LEVEL_1).toBe('administrative_area_level_1');
        expect(Constants_1.PlaceTypes.ADMINISTRATIVE_AREA_LEVEL_2).toBe('administrative_area_level_2');
        expect(Constants_1.PlaceTypes.CITIES).toBe('(cities)');
    });
});
//# sourceMappingURL=Constants.spec.js.map