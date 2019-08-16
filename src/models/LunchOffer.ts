import { Moment } from "moment";
import { Business } from "./Business";
import { Food, FoodType } from "./Food";
import { Publication } from "./Publication";
import { DATE_FORMAT } from "../constants";
import { slugify } from "../utils";

export class LunchOffer {
    public readonly date: Moment;
    public readonly business: Business;
    public readonly publications: Publication[] = [];
    public readonly foods: Food[] = [];
    public readonly moderated: boolean = false;
    public readonly score: number = 0;

    public constructor(data: Partial<LunchOffer> = {}) {
        Object.assign(this, data);
    }

    public get id(): string {
        const date = this.date.format(DATE_FORMAT);
        return `${date}#${this.business.id}`;
    }

    public get url(): string {
        return `https://nalunch.com/mapa${this.urlPath}`;
    }

    public get urlPath(): string {
        const city = slugify(this.business.city);
        const date = this.date.format(DATE_FORMAT);
        const enrichedSlug = this.business.enrichedSlug;
        return `/${city}/${date}/${enrichedSlug}`;
    }

    public get soups(): Food[] {
        return this.foods.filter(food => food.type === FoodType.Soup);
    }

    public get lunches(): Food[] {
        return this.foods.filter(food => food.type === FoodType.Lunch);
    }

    public get isEmpty(): boolean {
        return this.foods.length === 0;
    }
}
