import { Dict } from "../types";

export enum BusinessType {
    Facebook = "facebook",
    Website = "website",
}

export interface BusinessSource {
    toRaw(): Dict<string | undefined>;
}

export class FacebookSource implements BusinessSource {
    public facebookUrl: string;

    public constructor(data: Partial<FacebookSource> = {}) {
        Object.assign(this, data);
    }

    public toRaw(): Dict<string | undefined> {
        return {
            facebook_url: this.facebookUrl || undefined,
        };
    }
}

export class WebsiteSource implements BusinessSource {
    public url: string;
    public dateSelector?: string;
    public foodSelector?: string;

    public constructor(data: Partial<WebsiteSource> = {}) {
        Object.assign(this, data);
    }

    public toRaw(): Dict<string | undefined> {
        return {
            url: this.url || undefined,
            date_selector: this.dateSelector || undefined,
            food_selector: this.foodSelector || undefined,
        };
    }
}
