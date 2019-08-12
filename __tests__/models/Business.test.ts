import { Business, Location } from "../../src/models";
import { EnrichedSlug } from "../../src/chunk";

describe("Business", () => {
    it("has enrichedSlug", () => {
        // given
        const expectedEnrichedSlug = EnrichedSlug.fromString("my-business,505420000")!;

        const business = new Business({
            slug: "my-business",
            location: new Location({
                latitude: 50,
                longitude: 20,
            }),
        });

        // when
        const enrichedSlug = business.enrichedSlug;

        // then
        expect(enrichedSlug).toEqual(expectedEnrichedSlug);
    });
});
