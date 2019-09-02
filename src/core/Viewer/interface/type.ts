import { Tetris } from "../../Logic/Tetris";
import { Game } from "../../Logic/Game";
import { GameStatus } from "../../Logic/interface/types";
import { Square } from "../../Logic/Square";

export interface IViewer {
    show(): void;
    remove(): void;
}

export interface IGameViewer {
    init(game: Game): void;
    showNextTetris(tetris: Tetris, nextTetris: Tetris): void;
    toggleTips(status: GameStatus): void;
    removeExist(exist: Square[]): void;
    showScore(score: number): void;
}