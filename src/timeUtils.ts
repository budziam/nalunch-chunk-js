import * as moment from "moment";
import { Moment } from "moment";

export const hoursFromTime = (value: number): number => Math.floor(value / 60);
export const minutesFromTime = (value: number): number => value % 60;

export const timeToDate = (value: number): Moment =>
    moment()
        .hours(hoursFromTime(value))
        .minutes(minutesFromTime(value))
        .seconds(0);
