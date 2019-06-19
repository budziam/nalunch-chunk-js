import Axios, { AxiosInstance } from "axios";
import { Moment } from "moment";
import * as qs from "qs";
import { boundMethod } from "autobind-decorator";
import { DATE_FORMAT } from "../constants";
import { Coordinates, Dict } from "../types";
import { stringifyCoordinates, trimSlashes } from "../utils";

const to = (path: string, query: Dict<any> = {}): string =>
    `https://api.nalunch.com/${trimSlashes(path)}?${qs.stringify(query)}`;

export class NaLunchApi {
    public constructor(private readonly axios: AxiosInstance = Axios) {
        //
    }

    @boundMethod
    public async cities(): Promise<any> {
        const url = to("/cacheable/cities");
        const response = await this.axios.get(url);
        return response.data;
    }

    @boundMethod
    public async chunk(coordinates: Coordinates, date: Moment): Promise<any[]> {
        const url = to("/cacheable/chunks");
        const params = {
            date: date.format(DATE_FORMAT),
            coordinates: stringifyCoordinates(coordinates),
            version: 2,
        };

        const response = await this.axios.get(url, { params });

        return response.data;
    }

    @boundMethod
    public async declensions(expression: string): Promise<string[]> {
        const url = to(`/cacheable/declensions/${encodeURIComponent(expression)}`);
        const response = await this.axios.get(url);
        return response.data;
    }
}
