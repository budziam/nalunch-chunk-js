import { normalizeLeft } from "../../src/chunk/operations";

describe("operations", () => {
    it("normalizeLeft", () => {
        const dataset = [[142.2, 142.2], [142.21, 142.2], [142.25, 142.25]];

        for (const [value, expected] of dataset) {
            const got = normalizeLeft(value);
            expect(got).toBe(expected);
        }
    });
});
