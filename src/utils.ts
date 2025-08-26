export const clamp = (
    n: number, min: number = 0, max: number = Infinity
) => {
    return Math.max(min, Math.min(max, n));
};

export const snapR = (
    n: number, snapTo: number
) => {
    return Math.round(n / snapTo) * snapTo;
};

export const snapF = (
    n: number, snapTo: number
) => {
    return Math.floor(n / snapTo) * snapTo;
};
