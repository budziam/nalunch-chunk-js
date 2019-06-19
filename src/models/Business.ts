import { BusinessTimeInterval } from "./BusinessTimeInterval";
import { Location } from "./Location";

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

    public constructor(data: Partial<Business> = {}) {
        Object.assign(this, data);
    }
}
