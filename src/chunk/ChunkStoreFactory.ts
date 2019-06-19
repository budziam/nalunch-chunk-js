import { ChunkStore } from "./ChunkStore";
import { Coordinates, ErrorHandler } from "../types";
import { NaLunchApi } from "../NaLunchApi";
import { Moment } from "moment";
import { boundMethod } from "autobind-decorator";

export class ChunkStoreFactory {
    public constructor(
        private readonly api: NaLunchApi,
        private readonly errorHandler: ErrorHandler,
    ) {
        //
    }

    @boundMethod
    public create(coordinates: Coordinates, date: Moment): ChunkStore {
        return new ChunkStore(this.api, this.errorHandler, coordinates, date);
    }
}
