import { Coordinates } from "../types";
import { calculateChunkId, deserializeChunkId } from "./chunkUtils";

export const parseEnrichedSlug = (enrichedSlug: string): [string, Coordinates] | undefined => {
    const splitted = enrichedSlug.split(",");

    if (splitted.length < 2) {
        return undefined;
    }

    const chunkId = Number(splitted[1]);

    if (isNaN(chunkId)) {
        return undefined;
    }

    return [splitted[0], deserializeChunkId(chunkId)];
};

export const createEnrichedSlug = (slug: string, coordinates: Coordinates): string => {
    const chunkId = calculateChunkId(coordinates);
    return `${slug},${chunkId}`;
};
