import { EnrichedSlug } from "../../src/chunk";

describe("Enriched slug", () => {
    it("is the same if slug and coordinates are the same", () => {
        // given
        const example = new EnrichedSlug("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        const foobar = new EnrichedSlug("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        // when
        const isSame = example.isSame(foobar);

        // then
        expect(isSame).toBeTruthy();
    });

    it("is NOT the same if slugs differs", () => {
        // given
        const example = new EnrichedSlug("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        const foobar = new EnrichedSlug("foobar", {
            latitude: 10.4,
            longitude: 10.5,
        });

        // when
        const isSame = example.isSame(foobar);

        // then
        expect(isSame).toBeFalsy();
    });

    it("is NOT the same if coordinates differs", () => {
        // given
        const example = new EnrichedSlug("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        const foobar = new EnrichedSlug("example", {
            latitude: 10.4,
            longitude: 10.51,
        });

        // when
        const isSame = example.isSame(foobar);

        // then
        expect(isSame).toBeFalsy();
    });
});
