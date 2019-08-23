export interface Point {
    readonly x: number;
    readonly y: number;
}


export enum GameStatus {
    init,
    playing,
    pause,
    finished,
}
export type tuple = [number, number];

export type Shape = tuple[];
