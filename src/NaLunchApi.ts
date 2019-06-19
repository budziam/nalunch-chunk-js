import { AxiosInstance } from "axios";
import { Moment } from "moment";
import * as qs from "qs";
import Axios from "axios";
import { boundMethod } from "autobind-decorator";
import { DATE_FORMAT } from "./constants";
import { Coordinates, Dict } from "./types";
import { stringifyCoordinates, trimSlashes } from "./utils";

const url = (path: string, query: Dict<any> = {}): string => {
    return `https://api.nalunch.com/${trimSlashes(path)}?${qs.stringify(query)}`;
};

export class NaLunchApi {
    public constructor(
        private readonly axios: AxiosInstance = Axios,
    ) {
        //
    }

    @boundMethod
    public async chunk(coordinates: Coordinates, date: Moment): Promise<any[]> {
        const params = {
            date: date.format(DATE_FORMAT),
            coordinates: stringifyCoordinates(coordinates),
            version: 2,
        };

        const response = await this.axios.get(url("/cacheable/chunks"), {
            params,
        });

        return response.data;
    }
}
