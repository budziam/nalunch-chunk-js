import { EnrichedSlug } from "../../src/chunk";

describe("Enriched slug", () => {
    it("is the same if slug and coordinates are the same", () => {
        // given
        const example = EnrichedSlug.fromParams("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        const foobar = EnrichedSlug.fromParams("example", {
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
        const example = EnrichedSlug.fromParams("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        const foobar = EnrichedSlug.fromParams("foobar", {
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
        const example = EnrichedSlug.fromParams("example", {
            latitude: 10.4,
            longitude: 10.5,
        });

        const foobar = EnrichedSlug.fromParams("example", {
            latitude: 10.4,
            longitude: 10.56,
        });

        // when
        const isSame = example.isSame(foobar);

        // then
        expect(isSame).toBeFalsy();
    });

    it("has different coordinates than ones it was created from", () => {
        // when
        const example = EnrichedSlug.fromParams("example", {
            latitude: 10.42343,
            longitude: 10.501234,
        });

        // then
        expect(example.coordinates).toEqual({
            latitude: 10.4,
            longitude: 10.5,
        });
    });
});
