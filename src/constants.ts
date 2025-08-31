export const snapX = 15;
export const snapY = 22;
export const shadowW = 10;
export const barHeight = 22;
export const minWindowWidth = snapX * 21;
export const minWindowHeight = snapY * 5;

export const screenColors = {
    blueBlack: 'tui-bg-blue-black',
} as const;
export type ScreenColors = typeof screenColors;

export const colors = {
    black: { a8: 'black-168', ff: 'black-255' },
    blue: { a8: 'blue-168', ff: 'blue-255' },
    green: { a8: 'green-168', ff: 'green-255' },
    cyan: { a8: 'cyan-168', ff: 'cyan-255' },
    red: { a8: 'red-168', ff: 'red-255' },
    purple: { a8: 'purple-168', ff: 'purple-255' },
    yellow: { a8: 'yellow-168', ff: 'yellow-255' },
    white: { a8: 'white-168', ff: 'white-255' },
    orange: { a8: 'orange-168', ff: 'orange-255' },
} as const;
export type Colors = typeof colors;