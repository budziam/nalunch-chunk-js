import { Moment } from "moment";

export enum FoodType {
    Soup = "soup",
    Lunch = "lunch",
    Starter = "starter",
    Desert = "dessert",
    Side = "side",
}

export class Food {
    public id?: number;
    public name?: string;
    public price?: number;
    public type?: FoodType = FoodType.Lunch;
    public date?: Moment;

    public constructor(data: Partial<Food> = {}) {
        Object.assign(this, data);
    }
}
