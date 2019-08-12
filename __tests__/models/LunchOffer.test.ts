import { Business, Location, LunchOffer } from "../../src/models";
import * as moment from "moment";

describe("Business", () => {
    it("has url", () => {
        // given
        const lunchOffer = new LunchOffer({
            business: new Business({
                city: "Warszawa",
                slug: "my-business",
                location: new Location({
                    latitude: 50,
                    longitude: 20,
                }),
            }),
            date: moment("2019-08-12"),
        });

        // when
        const urlPath = lunchOffer.urlPath;
        const url = lunchOffer.url;

        // then
        expect(urlPath).toEqual("/warszawa/2019-08-12/my-business,505420000");
        expect(url).toEqual("https://nalunch.com/mapa/warszawa/2019-08-12/my-business,505420000");
    });
});
