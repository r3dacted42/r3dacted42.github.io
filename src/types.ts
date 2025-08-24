export interface WindowStyle {
    bgColor?: string,
    fgColor?: string,
};

export interface WindowState {
    id: string,
    title: string,
    zIndex: number,
    isMinimized: boolean,
    isMaximized: boolean,
};