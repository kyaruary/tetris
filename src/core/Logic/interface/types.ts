import { Tetris } from "../Tetris";

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

export interface IGame {
    currentTetris: Tetris;
    right1(): boolean;
    left1(): boolean;
    drop1(): boolean;
    rotate(): boolean;
    fallDown(): void;
    pauseOrStart(): void;
}