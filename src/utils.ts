import { Coordinates } from "./types";

export const stringifyCoordinates = (coordinates: Coordinates, separator: string = ","): string =>
    [coordinates.latitude, coordinates.longitude].join(separator);

export const trimSlashes = (text: string): string => text.replace(/^\/+/, "").replace(/\/+$/, "");
