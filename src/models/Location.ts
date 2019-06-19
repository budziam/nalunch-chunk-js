import { Coordinates } from "../types";

export class Location {
    public readonly latitude?: number;
    public readonly longitude?: number;
    public readonly label?: string;

    public constructor(data: Partial<Location> = {}) {
        Object.assign(this, data);
    }

    public get coordinates(): Coordinates {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            label: this.label,
        };
    }

    public get isEmpty(): boolean {
        return this.latitude === undefined && this.longitude === undefined;
    }

    public equals(coordinates?: Coordinates): boolean {
        if (!coordinates) {
            return this.latitude === undefined && this.longitude === undefined;
        }

        return this.latitude === coordinates.latitude && this.longitude === coordinates.longitude;
    }
}
