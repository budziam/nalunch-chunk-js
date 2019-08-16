import * as moment from "moment";
import {
    Food,
    FoodType,
    LunchOffer,
    Location,
    Publication,
    Business,
    BusinessTimeInterval,
    TimeIntervalType,
    BusinessType,
    FacebookSource,
    BusinessSource,
    WebsiteSource,
} from "../models";
import {
    RawBusiness,
    RawFood,
    RawLunchOffer,
    RawPublication,
    RawTimeInterval,
} from "./rawEntities";
import { nullToUndefined } from "../utils";
import { Coordinates } from "../types";
import { Moment } from "moment";

export const adaptLunchOffer = (data: RawLunchOffer): LunchOffer =>
    new LunchOffer({
        business: adaptBusiness(data.business),
        publications: data.publications.map(adaptPublication),
        foods: data.foods.map(adaptFood),
        date: adaptDate(data.date),
        moderated: data.moderated,
        score: data.score,
    });

const adaptBusiness = (data: RawBusiness): Business =>
    new Business({
        id: data.business_id,
        slug: data.slug,
        name: data.name,
        phoneNumber: nullToUndefined(data.phone_number),
        location: adaptLocation(data.location),
        address: nullToUndefined(data.address),
        city: nullToUndefined(data.city),
        zipCode: nullToUndefined(data.zip_code),
        coverImageUrl: nullToUndefined(data.cover_image_url),
        teaserImageUrl: nullToUndefined(data.teaser_image_url),
        minLunchPrice: nullToUndefined(data.min_lunch_price),
        maxLunchPrice: nullToUndefined(data.max_lunch_price),
        timeIntervals: (data.time_intervals || []).map(adaptTimeInterval),
        source: adaptSource(nullToUndefined(data.type) as BusinessType, data.source),
    });

export const adaptSource = (type: BusinessType, source: any): BusinessSource | undefined => {
    if (type === BusinessType.Facebook) {
        return new FacebookSource({
            facebookUrl: source.facebook_url,
        });
    }

    if (type === BusinessType.Website) {
        return new WebsiteSource({
            url: source.url,
            dateSelector: source.date_selector,
            foodSelector: source.food_selector,
        });
    }

    return undefined;
};

const adaptPublication = (data: RawPublication): Publication =>
    new Publication({
        id: data.id,
        url: data.url,
        date: adaptDate(data.date),
    });

const adaptFood = (data: RawFood): Food =>
    new Food({
        id: data.id,
        name: data.name,
        price: nullToUndefined(data.price),
        type: data.food_type as FoodType,
        date: adaptDate(data.date),
    });

const adaptTimeInterval = (data: RawTimeInterval): BusinessTimeInterval =>
    new BusinessTimeInterval({
        startTime: nullToUndefined(data.start_time),
        endTime: nullToUndefined(data.end_time),
        day: data.day,
        type: data.type as TimeIntervalType,
    });

const adaptDate = (text: string | undefined | null): Moment | undefined => {
    if (text === undefined || text === null) {
        return undefined;
    }

    const date = moment(text);

    if (!date.isValid()) {
        return undefined;
    }

    return date;
};

export const adaptLocation = (coordinates: Coordinates | undefined): Location => {
    if (coordinates === undefined) {
        return new Location();
    }

    return new Location({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        label: coordinates.label,
    });
};
