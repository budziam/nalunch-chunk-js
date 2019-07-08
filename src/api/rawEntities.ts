import { Coordinates, Dict } from "../types";

export interface RawLunchOffer {
    business: RawBusiness;
    publications: RawPublication[];
    foods: RawFood[];
    date: string;
}

export interface RawBusiness {
    business_id: string;
    name: string;
    slug: string;
    location: Coordinates;
    address: string | null;
    city: string | null;
    zip_code: string | null;
    phone_number: string | null;
    cover_image_url: string;
    teaser_image_url: string;
    min_lunch_price: number | null;
    max_lunch_price: number | null;
    time_intervals: RawTimeInterval[];
    type: string;
    source: Dict<string>;
}

export interface RawTimeInterval {
    id: number;
    day: number;
    start_time: number | null;
    end_time: number | null;
    type: string;
}

export interface RawPublication {
    id: number;
    url: string;
    date: string;
}

export interface RawFood {
    id: number;
    name: string;
    price: number | null;
    date: string;
    food_type: string;
}
