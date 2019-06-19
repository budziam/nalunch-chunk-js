import { Moment } from "moment";
import { Business } from "./Business";
import { Food } from "./Food";
import { Publication } from "./Publication";
import { DATE_FORMAT } from "../constants";
import { slugify } from "../utils";
import { createEnrichedSlug } from "../chunk/enrichedSlugUtils";

export class LunchOffer {
    public readonly date: Moment;
    public readonly business: Business;
    public readonly publications: Publication[] = [];
    public readonly foods: Food[] = [];

    public constructor(data: Partial<LunchOffer> = {}) {
        Object.assign(this, data);
    }

    public get id(): string {
        const date = this.date.format(DATE_FORMAT);
        return `${date}#${this.business.id}`;
    }

    public get url(): string {
        const city = slugify(this.business.city);
        const date = this.date.format(DATE_FORMAT);
        const slug = createEnrichedSlug(this.business.slug, this.business.location.coordinates);
        return `/${city}/${date}/${slug}`;
    }

    public get isEmpty(): boolean {
        return this.foods.length === 0;
    }
}
