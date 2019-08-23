import { Tetris } from "../../Logic/Tetris";
import { Game } from "../../Logic/Game";

export interface IViewer {
    show(): void;
    remove(): void;
}

export interface IGameViewer {
    init(game: Game): void;
    showNextTetris(tetris: Tetris): void;
}