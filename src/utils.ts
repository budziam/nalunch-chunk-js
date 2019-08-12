import { Coordinates } from "./types";
// tslint:disable-next-line:match-default-export-name
import baseSlugify from "slugify";

export const stringifyCoordinates = (coordinates: Coordinates, separator: string = ","): string =>
    [coordinates.latitude, coordinates.longitude].join(separator);

export const trimSlashes = (text: string): string => text.replace(/^\/+/, "").replace(/\/+$/, "");

export const slugify = (text: string): string => baseSlugify(text).toLowerCase();

export const nullToUndefined = <T>(value: T): Exclude<T, null> | undefined =>
    (value === null ? undefined : value) as Exclude<T, null>;

export const compare = (a: any, b: any, asc: boolean = true): number => {
    if (a === b) {
        return 0;
    }

    if (a === undefined) {
        return 1;
    }

    if (b === undefined) {
        return -1;
    }

    if (b > a) {
        return asc ? -1 : 1;
    }

    if (a > b) {
        return asc ? 1 : -1;
    }

    return 0;
};
