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

export type ProjectData = {
    id: string,
    title: string,
    languages: string[],
    description: string,
    homepage?: string,
    topics: string[],
    readme: string,
};