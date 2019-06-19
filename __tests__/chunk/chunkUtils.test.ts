import { calculateChunksCoordinates } from "../../src/chunk/chunkUtils";

describe("chunkUtils", () => {
    describe("calculateChunksCoordinates", () => {
        it("calculates chunks coordinates", () => {
            // given
            const radius = 2000;
            const point = {
                latitude: 52.2807629,
                longitude: 20.966010200000028,
            };

            // when
            const coordinates = [...calculateChunksCoordinates(point, radius)];

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
            const coordinates = [...calculateChunksCoordinates(point, radius)];

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
});
