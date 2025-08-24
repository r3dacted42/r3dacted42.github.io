export interface WindowStyle {
    bgColor?: string,
    fgColor?: string,
};

export interface WindowState {
    id: string,
    title: string,
    isActive: boolean,
    isMinimized: boolean,
    isMaximized: boolean,
};