import { ChunkService } from "./ChunkService";
import { Coordinates } from "../types";

export class EnrichedSlug {
    public constructor(public readonly slug: string, public readonly coordinates: Coordinates) {
        //
    }

    public static fromString(enrichedSlug: string): EnrichedSlug | undefined {
        const tuple = new ChunkService().parseEnrichedSlug(enrichedSlug);

        if (tuple === undefined) {
            return undefined;
        }

        return new EnrichedSlug(tuple[0], tuple[1]);
    }

    public toString(): string {
        return new ChunkService().createEnrichedSlug(this.slug, this.coordinates);
    }
}
