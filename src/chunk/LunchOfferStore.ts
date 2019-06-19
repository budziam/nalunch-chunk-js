import { ChunkStore } from "./ChunkStore";
import { boundMethod } from "autobind-decorator";
import { LunchOffer } from "../models";

export class LunchOfferStore {
    private _lunchOffer?: LunchOffer;

    public constructor(private readonly chunkStore: ChunkStore, lunchOffer?: LunchOffer) {
        this._lunchOffer = lunchOffer;
    }

    public get lunchOffer(): LunchOffer | undefined {
        return this._lunchOffer;
    }

    public setLunchOffer(lunchOffer: LunchOffer): void {
        this._lunchOffer = lunchOffer;
    }

    public get notFound(): boolean {
        return this.chunkStore.notFound || (this.isLoaded && !this.exists);
    }

    public get exists(): boolean {
        return this._lunchOffer !== undefined;
    }

    public get isLoading(): boolean {
        return this.chunkStore.isLoading;
    }

    public get isLoaded(): boolean {
        return this.chunkStore.isLoaded;
    }

    public get failed(): boolean {
        return this.chunkStore.failed;
    }

    public get outdated(): boolean {
        return this.chunkStore.outdated;
    }

    @boundMethod
    public async load(): Promise<void> {
        return this.chunkStore.load();
    }
}
