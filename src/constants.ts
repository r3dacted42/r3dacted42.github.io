export const snapX = 15;
export const snapY = 22;
export const shadowW = 10;
export const barHeight = 22;
export const minWindowWidth = snapX * 21;
export const minWindowHeight = snapY * 5;

export const screenColors = {
    blueBlack: 'tui-bg-blue-black',
} as const;
export type ScreenColor = typeof screenColors[keyof typeof screenColors];

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
export type Color = typeof colors[keyof typeof colors][keyof typeof colors[keyof typeof colors]];

// https://github.com/vinibiavatti1/TuiCss/wiki/Color
export const colorHexMap: Record<Color, string> = {
    // 168 (A8) Colors
    'black-168': '#000000',
    'blue-168': '#0000A8',
    'green-168': '#00A800',
    'cyan-168': '#00A8A8',
    'red-168': '#A80000',
    'purple-168': '#A800A8',
    'yellow-168': '#A8A800',
    'white-168': '#A8A8A8',
    'orange-168': '#A85600',
    // 255 (FF) Colors
    'black-255': '#000000',
    'blue-255': '#0000FF',
    'green-255': '#00FF00',
    'cyan-255': '#00FFFF',
    'red-255': '#FF0000',
    'purple-255': '#FF00FF',
    'yellow-255': '#FFFF00',
    'white-255': '#FFFFFF',
    'orange-255': '#FFA800',
};