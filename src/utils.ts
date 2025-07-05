export const clamp = (
    n: number, min: number = 0, max: number = Infinity
) => {
    return Math.max(min, Math.min(max, n));
};
