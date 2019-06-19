import { BusinessTimeInterval } from "./BusinessTimeInterval";

export class Business {
    public id?: string;
    public slug?: string;
    public name?: string;
    public phoneNumber?: string;
    public location: Location = new Location();
    public address?: string;
    public zipCode?: string;
    public city?: string;
    public minLunchPrice?: number;
    public maxLunchPrice?: number;
    public timeIntervals: BusinessTimeInterval[] = [];

    public constructor(data: Partial<Business> = {}) {
        Object.assign(this, data);
    }
}
