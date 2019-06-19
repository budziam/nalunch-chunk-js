import { Coordinates } from "../types";
import { createEnrichedSlug, parseEnrichedSlug } from "./enrichedSlugUtils";

export class EnrichedSlug {
    public constructor(public readonly slug: string, public readonly coordinates: Coordinates) {
        //
    }

    public static fromString(enrichedSlug: string): EnrichedSlug | undefined {
        const tuple = parseEnrichedSlug(enrichedSlug);

        if (tuple === undefined) {
            return undefined;
        }

        return new EnrichedSlug(tuple[0], tuple[1]);
    }

    public toString(): string {
        return createEnrichedSlug(this.slug, this.coordinates);
    }
}
