import { Moment } from "moment";
import { timeToDate } from "../timeUtils";

export enum TimeIntervalType {
    Lunch = "lunch",
    Opening = "opening",
}

export class BusinessTimeInterval {
    public readonly startTime?: number;
    public readonly endTime?: number;
    public readonly day: number;
    public readonly type: TimeIntervalType;

    public constructor(data: Partial<BusinessTimeInterval> = {}) {
        Object.assign(this, data);
    }

    public get isAvailable(): boolean {
        return !!this.startTime || !!this.endTime;
    }

    public get startDate(): Moment | undefined {
        if (this.startTime) {
            return timeToDate(this.startTime).day(this.day);
        }

        return undefined;
    }

    public get endDate(): Moment | undefined {
        if (this.endTime) {
            return timeToDate(this.endTime).day(this.day);
        }

        return undefined;
    }
}
