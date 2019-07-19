import { ChunkCollectionStore, createChunkCollectionStore } from "../src";

describe("factories", () => {
    it("creates chunk collection store", () => {
        // when

        const chunkCollectionStore = createChunkCollectionStore();

        // then
        expect(chunkCollectionStore).toBeInstanceOf(ChunkCollectionStore);
    });
});
