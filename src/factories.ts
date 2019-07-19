import { ChunkCollectionStore, ChunkStoreFactory } from "./chunk";
import { NaLunchApi } from "./api";
import { ErrorHandler } from "./types";
import { DummyErrorHandler } from "./DummyErrorHandler";

export const createChunkCollectionStore = (
    errorHandler: ErrorHandler = new DummyErrorHandler(),
) => {
    const api = new NaLunchApi();
    return new ChunkCollectionStore(api, new ChunkStoreFactory(api, errorHandler));
};
