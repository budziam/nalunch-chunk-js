import { Coordinates } from "../types";
import {
    ACCURACY,
    applyPrecision,
    CHUNK_SIZE,
    integerAccuracy,
    normalizeLeft,
    normalizeRight,
    roundDownToPrecision,
} from "./operations";
import { getLatitudeWithOffset, getLongitudeWithOffset } from "./coordinatesUtils";

export const calculateChunkId = (coordinates: Coordinates): number => {
    const roundedLatitude = roundDownToPrecision(coordinates.latitude);
    const roundedLongitude = roundDownToPrecision(coordinates.longitude);

    const normalizedLatitude = integerAccuracy(normalizeLeft(roundedLatitude + 90));
    const normalizedLongitude = integerAccuracy(normalizeLeft(roundedLongitude + 180));

    return integerAccuracy(normalizedLatitude * 361) + normalizedLongitude;
};

export const deserializeChunkId = (chunkId: number): Coordinates => {
    const longitude = applyPrecision((chunkId % (ACCURACY * 361)) / ACCURACY - 180);
    const latitude = applyPrecision(
        (chunkId - longitude * ACCURACY) / (ACCURACY * 361) / ACCURACY - 90,
    );

    return { latitude, longitude };
};

export function* calculateChunksCoordinates(
    coordinates: Coordinates,
    radius: number,
): IterableIterator<Coordinates> {
    const leftLatitude = getLatitudeWithOffset(coordinates, -radius);
    const rightLatitude = getLatitudeWithOffset(coordinates, radius);
    const leftLongitude = getLongitudeWithOffset(coordinates, -radius);
    const rightLongitude = getLongitudeWithOffset(coordinates, radius);

    const left = integerAccuracy(normalizeLeft(leftLatitude));
    const right = integerAccuracy(normalizeRight(rightLatitude));
    const bottom = integerAccuracy(normalizeLeft(leftLongitude));
    const top = integerAccuracy(normalizeRight(rightLongitude));
    const size = integerAccuracy(CHUNK_SIZE);

    for (let latitude = left; right - latitude >= 0; latitude += size) {
        for (let longitude = bottom; top - longitude >= 0; longitude += size) {
            yield {
                latitude: applyPrecision(latitude / ACCURACY),
                longitude: applyPrecision(longitude / ACCURACY),
            };
        }
    }
}
