import { Moment } from "moment";
import { Business } from "./Business";
import { Food } from "./Food";

export class LunchOffer {
    public readonly date: Moment;
    public readonly business: Business;
    public readonly foods: Food[] = [];

    public constructor(data: Partial<LunchOffer> = {}) {
        Object.assign(this, data);
    }
}
