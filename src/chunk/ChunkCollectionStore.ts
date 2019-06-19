import * as moment from "moment";
import { Moment } from "moment";
import { ChunkStore } from "./ChunkStore";
import { Coordinates } from "../types";
import { boundMethod } from "autobind-decorator";
import { LunchOffer } from "../models";
import { DATE_FORMAT } from "../constants";
import { NaLunchApi } from "../NaLunchApi";
import { LunchOfferStore } from "./LunchOfferStore";
import { ChunkStoreFactory } from "./ChunkStoreFactory";
import { EnrichedSlug } from "./EnrichedSlug";
import { calculateChunksCoordinates } from "./chunkUtils";
import { applyPrecision } from "./operations";

const generateChunkStoreKey = (coordinates: Coordinates, date: Moment): string => {
    const latitude = applyPrecision(coordinates.latitude);
    const longitude = applyPrecision(coordinates.longitude);
    return `${date.format(DATE_FORMAT)}#${latitude},${longitude}`;
};

export class ChunkCollectionStore {
    private readonly chunksStores: Map<string, ChunkStore> = new Map();

    public constructor(
        private readonly api: NaLunchApi,
        private readonly chunkStoreFactory: ChunkStoreFactory,
    ) {
        //
    }

    public get loadedAt(): Moment | undefined {
        const dates = [...this.chunksStores.values()]
            .map(chunkStore => chunkStore.loadedAt)
            .filter(date => date !== undefined);

        if (dates.length === 0) {
            return undefined;
        }

        return moment.max(dates);
    }

    public get count(): number {
        return [...this.chunksStores.values()]
            .map(chunkStore => chunkStore.count)
            .reduce((acc, value) => acc + value, 0);
    }

    public get lunchOffers(): LunchOffer[] {
        return [...this.chunksStores.values()].flatMap(chunkStore => chunkStore.lunchOffers);
    }

    @boundMethod
    public async load(coordinates: Coordinates, date: Moment, radius: number): Promise<void> {
        await Promise.all(
            this.getMatchingChunkStores(coordinates, date, radius).map(chunkStore =>
                chunkStore.load(),
            ),
        );
    }

    @boundMethod
    public getLunchOfferStore(
        date: Moment,
        enrichedSlug: EnrichedSlug,
    ): LunchOfferStore | undefined {
        const chunkStore = this.getOrCreateChunkStore(date, enrichedSlug.coordinates);
        const lunchOfferStore = chunkStore.getLunchOfferStore(date, enrichedSlug.slug);

        if (lunchOfferStore) {
            return lunchOfferStore;
        }

        return chunkStore.createLunchOfferStore(date, enrichedSlug.slug);
    }

    @boundMethod
    public getChunkStoresMatchingDate(date: Moment): ChunkStore[] {
        return [...this.chunksStores.values()].filter(chunkStore =>
            date.isSame(chunkStore.date, "day"),
        );
    }

    private getMatchingChunkStores(
        coordinates: Coordinates,
        date: Moment,
        radius: number,
    ): ChunkStore[] {
        return [...calculateChunksCoordinates(coordinates, radius)].map(chunkCoordinates =>
            this.getOrCreateChunkStore(date.clone(), chunkCoordinates),
        );
    }

    private getOrCreateChunkStore(date: Moment, coordinates: Coordinates): ChunkStore {
        const key = generateChunkStoreKey(coordinates, date);

        if (!this.chunksStores.has(key)) {
            this.chunksStores.set(key, this.chunkStoreFactory.create(coordinates, date));
        }

        return this.chunksStores.get(key);
    }
}
