import { ChunkService, Coordinates } from "../src";
import * as jsc from "jsverify";
import { CHUNK_SIZE } from "../src/ChunkService";

describe("ChunkService", () => {
    let chunkService: ChunkService;

    beforeEach(() => {
        chunkService = new ChunkService();
    });

    describe("enriched slug", () => {
        const dataset: Array<[string, string, Coordinates]> = [
            ["test,505600490", "test", { latitude: 50.05, longitude: 19.9 }],
            ["wilcza,513362100", "wilcza", { latitude: 52.2, longitude: 21 }],
        ];

        it("parses enriched slugs", () => {
            for (const [enrichedSlug, expectedSlug, expectedCoordinates] of dataset) {
                const [slug, coordinates] = chunkService.parseEnrichedSlug(enrichedSlug);
                expect(slug).toBe(expectedSlug);
                expect(coordinates).toEqual(expectedCoordinates);
            }
        });

        it("creates enriched slugs", () => {
            for (const [expectedEnrichedSlug, slug, coordinates] of dataset) {
                const enrichedSlug = chunkService.createEnrichedSlug(slug, coordinates);
                expect(enrichedSlug).toBe(expectedEnrichedSlug);
            }
        });

        it("creates enriched slug from too precise coordinates", () => {
            const latitude = 50.049957;
            const longitude = 19.962803;
            const coordinates = { latitude, longitude };
            const slug = "szuwary";

            const enrichedSlug = chunkService.createEnrichedSlug(slug, coordinates);

            expect(enrichedSlug).toBe("szuwary,505419995");
        });

        it("creates enriched slugs for fuzzy input", () => {
            const slug = "szuwary";

            const property = jsc.forall(
                jsc.number(0, 90),
                jsc.number(0, 180),
                (latitude, longitude) => {
                    const enrichedSlug = chunkService.createEnrichedSlug(slug, {
                        latitude,
                        longitude,
                    });
                    const [parsedSlug, chunkCoordinates] = chunkService.parseEnrichedSlug(
                        enrichedSlug,
                    );

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

    describe("calculateChunksCoordinates", () => {
        it("calculates chunks coordinates", () => {
            // given
            const radius = 2000;
            const point = {
                latitude: 52.2807629,
                longitude: 20.966010200000028,
            };

            // when
            const coordinates = [...chunkService.calculateChunksCoordinates(point, radius)];

            // then
            expect(coordinates).toEqual([
                {
                    latitude: 52.25,
                    longitude: 20.9,
                },
                {
                    latitude: 52.25,
                    longitude: 20.95,
                },
            ]);
        });

        it("6km from warsaw", () => {
            // given
            const radius = 6000;
            const point = {
                latitude: 52.2293434,
                longitude: 21.0122043,
            };

            // when
            const coordinates = [...chunkService.calculateChunksCoordinates(point, radius)];

            // then
            expect(coordinates).toEqual([
                {
                    latitude: 52.15,
                    longitude: 20.9,
                },
                {
                    latitude: 52.15,
                    longitude: 20.95,
                },
                {
                    latitude: 52.15,
                    longitude: 21,
                },
                {
                    latitude: 52.15,
                    longitude: 21.05,
                },
                {
                    latitude: 52.15,
                    longitude: 21.1,
                },
                {
                    latitude: 52.2,
                    longitude: 20.9,
                },
                {
                    latitude: 52.2,
                    longitude: 20.95,
                },
                {
                    latitude: 52.2,
                    longitude: 21,
                },
                {
                    latitude: 52.2,
                    longitude: 21.05,
                },
                {
                    latitude: 52.2,
                    longitude: 21.1,
                },
                {
                    latitude: 52.25,
                    longitude: 20.9,
                },
                {
                    latitude: 52.25,
                    longitude: 20.95,
                },
                {
                    latitude: 52.25,
                    longitude: 21,
                },
                {
                    latitude: 52.25,
                    longitude: 21.05,
                },
                {
                    latitude: 52.25,
                    longitude: 21.1,
                },
            ]);
        });
    });

    describe("normalizeLeft", () => {
        it("normalizeLeft", () => {
            const dataset = [[142.2, 142.2], [142.21, 142.2], [142.25, 142.25]];

            for (const [value, expected] of dataset) {
                const got = chunkService.normalizeLeft(value);
                expect(got).toBe(expected);
            }
        });
    });
});
