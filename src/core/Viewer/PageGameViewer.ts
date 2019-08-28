import { IGameViewer } from "./interface/type";
import { Tetris } from "../Logic/Tetris";
import { Game } from "../Logic/Game";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
export class PageGameViewer implements IGameViewer {
    private _container: JQuery<HTMLElement> = $('#app');
    private _tip: JQuery<HTMLElement> = $('#tip');
    showNextTetris(tetris: Tetris): void {
        this.bindViewer(tetris, this._container);
    }
    init(game: Game) {
        // 初始化游戏区
        // 添加事件监听
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    game.left1();
                    break;
                case 38:
                    game.rotate();
                    break;
                case 39:
                    game.right1();
                    break;
                case 40:
                    game.fallDown();
                    break;
                default:
                    break;
            }
        });
        game.currentTetris ? this.bindViewer(game.currentTetris, this._container) : false;
    }
    bindViewer(tetris: Tetris, container: JQuery<HTMLElement>) {
        tetris.squareGroup.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, container);
            sq.viewer.show();
        })
    }
}