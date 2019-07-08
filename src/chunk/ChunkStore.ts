import { Moment } from "moment";
import { AxiosError } from "axios";
import { boundMethod } from "autobind-decorator";
import * as moment from "moment";
import { DATE_FORMAT } from "../constants";
import { Coordinates, ErrorHandler } from "../types";
import { LunchOffer } from "../models";
import { LunchOfferStore } from "./LunchOfferStore";
import { NaLunchApi } from "../api";
import { adaptLunchOffer } from "../api/adapters";

const MAX_CHUNK_AGE_IN_SECONDS = 180;

const generateLunchOfferStoreKey = (date: Moment, slug: string): string =>
    `${date.format(DATE_FORMAT)}#${slug}`;

export class ChunkStore {
    public isLoading: boolean = false;
    public _loadedAt?: Moment;
    private error?: AxiosError;
    private readonly lunchOffersStores: Map<string, LunchOfferStore> = new Map();

    public constructor(
        private readonly api: NaLunchApi,
        private readonly errorHandler: ErrorHandler,
        private readonly coordinates: Coordinates,
        private readonly _date: Moment,
    ) {
        //
    }

    public get date(): Moment {
        return this._date.clone();
    }

    public get failed(): boolean {
        return this.error !== undefined;
    }

    public get outdated(): boolean {
        if (!this.error || !this.error.response) {
            return false;
        }

        const status = this.error.response.status;
        const errors = this.error.response.data.errors || {};

        return status === 422 && errors.date === "too_distant_date";
    }

    public get notFound(): boolean {
        if (!this.error || !this.error.response) {
            return false;
        }

        const status = this.error.response.status;
        const errors = this.error.response.data.errors || {};

        return status === 422 && errors.coordinates === "Invalid coordinates";
    }

    public get isLoaded(): boolean {
        return this._loadedAt !== undefined;
    }

    public get loadedAt(): Moment | undefined {
        return this._loadedAt !== undefined ? this._loadedAt.clone() : undefined;
    }

    public get count(): number {
        return this.lunchOffers.length;
    }

    public get lunchOffers(): LunchOffer[] {
        return [...this.lunchOffersStores.values()]
            .filter(lunchOfferStore => lunchOfferStore.exists)
            .map(lunchOfferStore => lunchOfferStore.lunchOffer);
    }

    @boundMethod
    public async reload(): Promise<void> {
        if (this.isLoading) {
            return;
        }

        this.markAsLoading();

        try {
            const response = await this.api.chunk(this.coordinates, this._date);
            const lunchOffers = response.map(adaptLunchOffer);
            this.applyLunchOffers(lunchOffers);
        } catch (e) {
            this.markAsFailed(e);
            this.errorHandler.handle(e);
        }
    }

    @boundMethod
    public async load(): Promise<void> {
        if (this._loadedAt && moment().diff(this._loadedAt, "second") < MAX_CHUNK_AGE_IN_SECONDS) {
            return;
        }

        return this.reload();
    }

    public getLunchOfferStore(date: Moment, slug: string): LunchOfferStore | undefined {
        const key = generateLunchOfferStoreKey(date, slug);
        return this.lunchOffersStores.get(key);
    }

    public createLunchOfferStore(date: Moment, slug: string): LunchOfferStore {
        const key = generateLunchOfferStoreKey(date, slug);
        const lunchOfferStore = new LunchOfferStore(this);
        this.lunchOffersStores.set(key, lunchOfferStore);
        return lunchOfferStore;
    }

    private markAsLoading(): void {
        this.isLoading = true;
    }

    private markAsFailed(e: any): void {
        this.error = e;
        this.isLoading = false;
    }

    private applyLunchOffers(lunchOffers: LunchOffer[]): void {
        this.lunchOffersStores.clear();

        for (const lunchOffer of lunchOffers) {
            this.createLunchOfferStoreFromLunchOffer(lunchOffer);
        }

        this.error = undefined;
        this.isLoading = false;
        this._loadedAt = moment();
    }

    private createLunchOfferStoreFromLunchOffer(lunchOffer: LunchOffer): void {
        const key = generateLunchOfferStoreKey(this._date, lunchOffer.business.slug);

        if (this.lunchOffersStores.has(key)) {
            this.lunchOffersStores.get(key).setLunchOffer(lunchOffer);
        } else {
            const store = new LunchOfferStore(this, lunchOffer);
            this.lunchOffersStores.set(key, store);
        }
    }
}
