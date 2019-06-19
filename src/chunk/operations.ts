export const CHUNK_SIZE = 0.05;
export const PRECISION = 2;
export const ACCURACY = 10 ** PRECISION;

export const roundDownToPrecision = (value: number): number => {
    const increasedAccuracy = 10 ** (PRECISION + 1);
    const multiplied = value * increasedAccuracy;
    return (multiplied - (multiplied % 10)) / increasedAccuracy;
};

export const integerAccuracy = (value: number): number => {
    const [left, right] = value.toFixed(PRECISION + 1).split(".");
    return Number(left) * ACCURACY + Number(right.slice(0, PRECISION));
};

// Custom implementation of Math.floor that works. Math.floor fails for this case: Math.floor(142.2 * 100)
// We cast it to a string and take everything before "."
const floor = (value: number): number => Number(String(value).split(".")[0]);

export const applyPrecision = (value: number): number => integerAccuracy(value) / ACCURACY;

export const normalizeLeft = (value: number): number => {
    const integer = integerAccuracy(value);
    const size = integerAccuracy(CHUNK_SIZE);
    return applyPrecision(floor(integer / size) * CHUNK_SIZE);
};

export const normalizeRight = applyPrecision;
