import { Moment } from "moment";

export class Publication {
    public readonly id: number;
    public readonly url: string;
    public readonly date: Moment;

    public constructor(data: Partial<Publication> = {}) {
        Object.assign(this, data);
    }
}
