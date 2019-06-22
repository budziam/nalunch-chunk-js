import { Moment } from "moment";

export interface Dict<T> {
    [key: string]: T;
}

export interface Coordinates {
    readonly latitude: number;
    readonly longitude: number;
    readonly label?: string;
}

export interface TimeInterval {
    start?: Moment;
    end?: Moment;
}

export interface ErrorHandler {
    handle(e: Error, options?: any): void;
}
