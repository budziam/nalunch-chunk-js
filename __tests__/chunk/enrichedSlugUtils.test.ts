import * as jsc from "jsverify";
import { Coordinates } from "../../src";
import { createEnrichedSlug, parseEnrichedSlug } from "../../src/chunk/enrichedSlugUtils";
import { CHUNK_SIZE } from "../../src/chunk/operations";

describe("enrichedSlugUtils", () => {
    const dataset: Array<[string, string, Coordinates]> = [
        ["test,505600490", "test", { latitude: 50.05, longitude: 19.9 }],
        ["wilcza,513362100", "wilcza", { latitude: 52.2, longitude: 21 }],
    ];

    it("parses enriched slugs", () => {
        for (const [enrichedSlug, expectedSlug, expectedCoordinates] of dataset) {
            const [slug, coordinates] = parseEnrichedSlug(enrichedSlug);
            expect(slug).toBe(expectedSlug);
            expect(coordinates).toEqual(expectedCoordinates);
        }
    });

    it("creates enriched slugs", () => {
        for (const [expectedEnrichedSlug, slug, coordinates] of dataset) {
            const enrichedSlug = createEnrichedSlug(slug, coordinates);
            expect(enrichedSlug).toBe(expectedEnrichedSlug);
        }
    });

    it("creates enriched slug from too precise coordinates", () => {
        const latitude = 50.049957;
        const longitude = 19.962803;
        const coordinates = { latitude, longitude };
        const slug = "szuwary";

        const enrichedSlug = createEnrichedSlug(slug, coordinates);

        expect(enrichedSlug).toBe("szuwary,505419995");
    });

    it("creates enriched slugs for fuzzy input", () => {
        const slug = "szuwary";

        const property = jsc.forall(
            jsc.number(0, 90),
            jsc.number(0, 180),
            (latitude, longitude) => {
                const enrichedSlug = createEnrichedSlug(slug, {
                    latitude,
                    longitude,
                });
                const tuple = parseEnrichedSlug(enrichedSlug)!;
                const [parsedSlug, chunkCoordinates] = tuple;

                const latitudeDiff = latitude - chunkCoordinates.latitude;
                const longitudeDiff = longitude - chunkCoordinates.longitude;

                return (
                    parsedSlug === slug &&
                    latitudeDiff >= 0 &&
                    latitudeDiff < CHUNK_SIZE &&
                    longitudeDiff >= 0 &&
                    longitudeDiff < CHUNK_SIZE
                );
            },
        );

        expect(jsc.check(property)).toBeTruthy();
    });
});
