import { BusinessTimeInterval, TimeIntervalType } from "./BusinessTimeInterval";
import { Location } from "./Location";
import { Moment } from "moment";
import { TimeInterval } from "../types";
import { compare } from "../utils";
import { BusinessSource } from "./Source";
import { EnrichedSlug } from "../chunk";

const getHours = (
    timeIntervals: BusinessTimeInterval[],
    date: Moment,
    type: TimeIntervalType,
): TimeInterval[] => {
    const day = date.day();

    return timeIntervals
        .filter(interval => interval.isAvailable && interval.day === day && interval.type === type)
        .map(interval => ({
            start: formatHour(date, interval.startDate),
            end: formatHour(date, interval.endDate),
        }))
        .sort((a, b) => compare(`${a.start}#${a.end}`, `${b.start}#${b.end}`));
};

const formatHour = (baseDate: Moment, relativeDate?: Moment): Moment | undefined => {
    if (relativeDate === undefined) {
        return undefined;
    }

    return baseDate
        .clone()
        .set("hour", relativeDate.hour())
        .set("minute", relativeDate.minute());
};

export class Business {
    public readonly id: string;
    public readonly slug: string;
    public readonly name: string;
    public readonly phoneNumber?: string;
    public readonly location: Location = new Location();
    public readonly address?: string;
    public readonly zipCode?: string;
    public readonly city: string;
    public readonly coverImageUrl?: string;
    public readonly teaserImageUrl?: string;
    public readonly minLunchPrice?: number;
    public readonly maxLunchPrice?: number;
    public readonly timeIntervals: BusinessTimeInterval[] = [];
    public readonly source: BusinessSource;

    public constructor(data: Partial<Business> = {}) {
        Object.assign(this, data);
    }

    public get fullAddress(): string {
        return `${this.address}, ${this.city}`;
    }

    public get hasLocation(): boolean {
        return !!this.location && !!this.location.latitude && !!this.location.longitude;
    }

    public get enrichedSlug(): EnrichedSlug {
        return new EnrichedSlug(this.slug, this.location.coordinates);
    }

    public getOpeningHours(date: Moment): TimeInterval[] {
        return getHours(this.timeIntervals, date, TimeIntervalType.Opening);
    }

    public getLunchHours(date: Moment): TimeInterval[] {
        return getHours(this.timeIntervals, date, TimeIntervalType.Lunch);
    }
}
