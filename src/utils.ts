import { Coordinates, Dict } from "./types";

export const stringifyCoordinates = (coordinates: Coordinates, separator: string = ","): string =>
    [coordinates.latitude, coordinates.longitude].join(separator);

export const trimSlashes = (text: string): string => text.replace(/^\/+/, "").replace(/\/+$/, "");

const SPECIAL_CHARS_MAPPING: Dict<string> = {
    ł: "l",
    Ł: "L",
};

// https://stackoverflow.com/questions/286921/efficiently-replace-all-accented-characters-in-a-string/9667817#9667817
export const replaceDiactricChars = (text: string): string => {
    try {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Za-z0-9]/g, char => SPECIAL_CHARS_MAPPING[char] || char);
    } catch (e) {
        console.error(e);
        return text;
    }
};

export const slugify = (text: string): string =>
    replaceDiactricChars(text)
        .toLowerCase()
        .trim()
        .replace(/[^A-Za-z0-9]+/g, "-");

export const nullToUndefined = <T>(value: T): Exclude<T, null> | undefined =>
    // @ts-ignore
    value === null ? undefined : value;

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
