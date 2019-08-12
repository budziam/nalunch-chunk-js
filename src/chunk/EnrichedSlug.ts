import { Coordinates } from "../types";
import { createEnrichedSlug, parseEnrichedSlug } from "./enrichedSlugUtils";

export class EnrichedSlug {
    private constructor(public readonly slug: string, public readonly coordinates: Coordinates) {
        //
    }

    public static fromParams(slug: string, coordinates: Coordinates): EnrichedSlug {
        return EnrichedSlug.fromString(createEnrichedSlug(slug, coordinates))!;
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

    public isSame(enrichedSlug: EnrichedSlug): boolean {
        return (
            this.slug === enrichedSlug.slug &&
            this.coordinates.longitude === enrichedSlug.coordinates.longitude &&
            this.coordinates.latitude === enrichedSlug.coordinates.latitude
        );
    }
}
