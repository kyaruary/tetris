import { Point, GameStatus, IGame } from "./interface/types";
import { Utils } from "../utils";
import { TetrisShape, TetrisColors, TetrisConfig, blockShape } from "../../config/tetris.config";
import { Tetris } from "./Tetris";
import { IGameViewer } from "../Viewer/interface/type";
import { TetrisRule } from "./TetrisRule";
import { Square } from "./Square";

/**
 * 游戏生命周期
 * 游戏状态
 * 游戏操作
 */

export class Game implements IGame {
    private _mainCenterPoint: Point = { x: TetrisConfig.gameArea.width / 2 - 1, y: 1 };
    private _tipCenterPoint: Point = { x: TetrisConfig.tipsArea.width / 2 - 1, y: 1 };
    private _currentTetris: Tetris;
    private _nextTetris: Tetris;
    private _gameStatus: GameStatus;
    private _duration: number = TetrisConfig.levels.easy.duration;
    private _score: number = 0;
    private _exist: Square[] = [];
    private _timer: number;
    private _layer: number;
    private _isClock = TetrisConfig.isClock;
    private _gameWidth = TetrisConfig.gameArea.width;
    private _gameHeight = TetrisConfig.gameArea.height;
    constructor(private _viewer: IGameViewer) {
        this.changeGameStatus(GameStatus.init);
        this._viewer.init(this);
        this._viewer.toggleTips(this._gameStatus);
    }


    /**
     * 切换方块
     * 前戏：
     * 方块落地不能移动之后清除计时器 
     * 判断已经存在的方块是否可以消除
     * 成功消除方块之后计分 清除方块
     * 判断积分是否达到阈值更改降落速度
     * 生成新的方块并显示
     */
    switchTetris() {
        this._currentTetris = this._nextTetris;
        this._currentTetris.centerPoint = this._mainCenterPoint;
        this._nextTetris = this.generateTetris(this._tipCenterPoint);
        // 修正首次出现重叠现象
        this.fixOverlap();
        this._viewer.showNextTetris(this._currentTetris, this._nextTetris);
    }

    // 上下左右功能
    right1(): boolean {
        const target: Point = {
            x: this._currentTetris.centerPoint.x + 1,
            y: this._currentTetris.centerPoint.y
        }
        return this.move(target);
    }

    left1(): boolean {
        const target: Point = {
            x: this._currentTetris.centerPoint.x - 1,
            y: this._currentTetris.centerPoint.y
        }
        return this.move(target);
    }

    drop1(): boolean {
        const target: Point = {
            x: this._currentTetris.centerPoint.x,
            y: this._currentTetris.centerPoint.y + 1
        }
        if (this.move(target)) {
            return true;
        } else {
            if (this._gameStatus === GameStatus.playing) {
                this.hitBottom();
            }
            return false;
        }
    }

    fallDown() {
        while (this.drop1()) { }
    }

    rotate(): boolean {
        if (this._gameStatus !== GameStatus.playing) {
            return false;
        }
        const isBlock = this._currentTetris.shape.every((s, index) =>
            s[0] === blockShape[index][0] && s[1] === blockShape[index][1]);
        if (isBlock) return false;
        const new_shape = TetrisRule.nextRotateShape(this._currentTetris, this._isClock);
        const flag = TetrisRule.canIMove(new_shape, this._currentTetris.centerPoint, this._exist, this._gameWidth, this._gameHeight);
        if (flag) TetrisRule.changeShape(this._currentTetris, new_shape);
        return flag;
    }

    private move(target: Point): boolean {
        if (!this._currentTetris || this._gameStatus !== GameStatus.playing) return false;
        if (TetrisRule.canIMove(this._currentTetris.shape, target, this._exist, this._gameWidth, this._gameHeight)) {
            TetrisRule.move(this._currentTetris, target);
            return true;
        }
        return false;
    }

    private generateTetris(centerPoint: Point): Tetris {
        return new Tetris(Utils.getRandomMember(TetrisShape), centerPoint, Utils.getRandomMember(TetrisColors));
    }

    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) return false;
        this._timer = window.setInterval(() => {
            this.drop1();
        }, this._duration);
    }

    public get currentTetris(): Tetris {
        return this._currentTetris;
    }
    public get nextTetris(): Tetris {
        return this._nextTetris;
    }

    private changeGameStatus(status: GameStatus) {
        if (this._gameStatus === status) return false;
        this._gameStatus = status;
        switch (this._gameStatus) {
            case GameStatus.init:
                this.init();
                break;
            case GameStatus.finished:
                this.finished();
                break;
            case GameStatus.pause:
                this.pause();
                break;
            case GameStatus.playing:
                this.autoDrop();
                break;
            default:
                break;
        }
        this._viewer.toggleTips(this._gameStatus);
    }
    // 销毁游戏
    private destory() { }
    // 暂停
    public pauseOrStart() {
        switch (this._gameStatus) {
            case GameStatus.playing:
                this.changeGameStatus(GameStatus.pause);
                break;
            case GameStatus.finished:
                this.changeGameStatus(GameStatus.init);
                break;
            default:
                this.changeGameStatus(GameStatus.playing);
                break;
        }
        this._viewer.toggleTips(this._gameStatus);
    }
    private pause() {
        this.clearInterval();
    }
    // 游戏开始
    public start() {
        this.changeGameStatus(GameStatus.playing);
    }
    private finished() {
        this.clearInterval();
        this._viewer.toggleTips(this._gameStatus);
    }
    public get score() {
        return this._score;
    }
    private clearInterval() {
        window.clearInterval(this._timer);
        this._timer = undefined;
    }
    private hitBottom() {
        this.clearInterval();
        this._exist.push(...this._currentTetris.squareGroup);
        this.eliminate();
        const isPeek = this.peekJudgement();
        if (isPeek) {
            this.changeGameStatus(GameStatus.finished);
        } else {
            this.switchTetris();
            this.autoDrop();
        }
    }
    private eliminate() {
        const e = TetrisRule.canEliminate(this._exist, this._gameWidth);
        if (e.length !== 0) {
            this._exist = TetrisRule.eliminateLines(this._exist, e);
        }
    }
    private init() {
        this._currentTetris = this.generateTetris(this._mainCenterPoint);
        this._nextTetris = this.generateTetris(this._tipCenterPoint);
        this._viewer.removeExist(this._exist);
        this._exist = [];
        this._score = 0;
        // this.switchTetris();
    }
    private peekJudgement() {
        return this._exist.some(e => e.point.y <= 0);
    }
    private fixOverlap() {
        while (this._currentTetris.squareGroup.some(s => this._exist.some(e => e.point.x === s.point.x && e.point.y === s.point.y))) {
            this._currentTetris.centerPoint = {
                x: this._currentTetris.centerPoint.x,
                y: this._currentTetris.centerPoint.y - 1
            }
        }
    }
}