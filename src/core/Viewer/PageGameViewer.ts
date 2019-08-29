import { IGameViewer, IViewer } from "./interface/type";
import { Tetris } from "../Logic/Tetris";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
import { IGame, GameStatus } from "../Logic/interface/types";
export class PageGameViewer implements IGameViewer {
    private _container: JQuery<HTMLElement> = $('#app');
    private _next: JQuery<HTMLElement> = $('#next');
    private _tips: JQuery<HTMLElement> = $('#tips');

    showNextTetris(tetris: Tetris): void {
        this.bindViewer(tetris, this._container);
    }

    /**
     * 初始化游戏区
     * 添加事件监听
     * @param  {IGame} game
     */
    init(game: IGame) {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 32:
                    game.pauseOrStart();
                    break;
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
                    e.preventDefault();
                    e.stopPropagation();
                    break;
            }
        });
        game.currentTetris ? this.bindViewer(game.currentTetris, this._container) : false;
    }
    private bindViewer(tetris: Tetris, container: JQuery<HTMLElement>) {
        tetris.squareGroup.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, container);
            sq.viewer.show();
        })
    }

    toggleTips(status: GameStatus): void {
        switch (status) {
            case GameStatus.init:
                console.log('初始化');
                break;
            case GameStatus.pause:
                console.log('暂停');
                break;
            case GameStatus.playing:
                console.log('开始');
                break;
            case GameStatus.finished:
                console.log('游戏结束');
                break;
            default:
                break;
        }
    }
    public static createInstanceTips() {

    }
}