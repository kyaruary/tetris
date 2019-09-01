import { IGameViewer, IViewer } from "./interface/type";
import { Tetris } from "../Logic/Tetris";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
import { IGame, GameStatus } from "../Logic/interface/types";
import { TetrisConfig } from "../../config/tetris.config";
import { PageConfig } from "../../config/page.config";
import { Square } from "../Logic/Square";
export class PageGameViewer implements IGameViewer {
    private _container: JQuery<HTMLElement> = $('#app');
    private _next: JQuery<HTMLElement> = $('#next');
    private _tips: JQuery<HTMLElement> = $('#tips');
    private gameArea = TetrisConfig.gameArea;
    private tipsArea = TetrisConfig.tipsArea;
    constructor() {
        this._container.css({
            height: this.gameArea.height * PageConfig.squareConfig.height,
            width: this.gameArea.width * PageConfig.squareConfig.width
        });
        this._next.css({
            height: this.tipsArea.height * PageConfig.squareConfig.height,
            width: this.tipsArea.width * PageConfig.squareConfig.width
        });
    }
    showNextTetris(c: Tetris, n: Tetris): void {
        this._next.empty();
        this.bindViewer(c, this._container);
        this.bindViewer(n, this._next);
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
        this.showNextTetris(game.currentTetris, game.nextTetris);
        this._tips.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            game.pauseOrStart();
        });
    }

    private bindViewer(tetris: Tetris, container: JQuery<HTMLElement>) {
        tetris.squareGroup.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, container);
            sq.viewer.show();
        })
    }
    public removeExist(exist: Square[]) {
        exist.forEach(e => {
            e.viewer.remove();
        });
    }
    toggleTips(status: GameStatus): void {
        switch (status) {
            case GameStatus.init:
                this.showTips('开始');
                break;
            case GameStatus.pause:
                this.showTips('pause😀');
                break;
            case GameStatus.playing:
                this._tips.hide();
                break;
            case GameStatus.finished:
                this.showTips('游戏结束！');
                break;
            default:
                break;
        }
    }
    private showTips(message: string) {
        this._tips.text(message).show();
    }
}