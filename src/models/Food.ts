import { Moment } from "moment";

export enum FoodType {
    Soup = "soup",
    Lunch = "lunch",
    Starter = "starter",
    Desert = "dessert",
    Side = "side",
}

export class Food {
    public readonly id: number;
    public readonly name: string;
    public readonly price?: number;
    public readonly type: FoodType = FoodType.Lunch;
    public readonly date: Moment;

    public constructor(data: Partial<Food> = {}) {
        Object.assign(this, data);
    }
}
