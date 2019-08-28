import { Point, GameStatus } from "./interface/types";
import { Utils } from "../utils";
import { TetrisShape, TetrisColors, TetrisConfig } from "../../config/tetris.config";
import { Tetris } from "./Tetris";
import { IGameViewer } from "../Viewer/interface/type";
import { TetrisRule } from "./TetrisRule";
import { Square } from "./Square";

/**
 * 游戏生命周期
 * 游戏状态
 * 游戏操作
 */

export class Game {
    private _mainCenterPoint: Point = { x: TetrisConfig.width / 2 - 1, y: 1 };
    private _tipCenterPoint: Point = { x: TetrisConfig.width / 2 - 1, y: 0 };
    private _currentTetris: Tetris;
    private _nextTetris: Tetris;
    private _gameStatus: GameStatus;
    private _duration?: number = TetrisConfig.levels.easy.duration;
    private _score: number = 0;
    private _exist: Square[] = [];
    private _timer: number;
    private _isClock = TetrisConfig.isClock;
    private _gameWidth = TetrisConfig.width;
    private _gameHeight = TetrisConfig.height;
    constructor(private _viewer: IGameViewer) {
        this.changeGameStatus(GameStatus.init);
        this._viewer.init(this);
    }

    // 游戏开始
    start() {
        this.changeGameStatus(GameStatus.playing);
    }

    /**
     * 切换方块
     * 前戏：
     * 方块落地不能移动之后清楚计时器 
     * 判断已经存在的方块是否可以消除
     * 成功消除方块之后计分 清除方块
     * 判断积分是否达到阈值更改降落速度
     * 生成新的方块并显示
     */
    switchTetris() {
        clearInterval(this._timer);
        if(TetrisRule.canEliminate(this._exist, this._gameWidth)){}
        this._currentTetris = this._nextTetris;
        this._currentTetris.centerPoint = this._mainCenterPoint;
        this._nextTetris = this.generateTetris(this._tipCenterPoint);
        this._viewer.showNextTetris(this._currentTetris);
        this.autoDrop();
    }
    // 将等待方块切换到游戏区

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
            this._exist.push(...this._currentTetris.squareGroup);
            this.switchTetris();
            return false;
        }
    }

    fallDown() {
        while (this.drop1()) { }
    }

    rotate(): boolean {
        if (!this._currentTetris) {
            return false;
        }
        const new_shape = TetrisRule.nextRotateShape(this._currentTetris, this._isClock);
        const flag = TetrisRule.canIMove(new_shape, this._currentTetris.centerPoint, this._exist, this._gameWidth, this._gameHeight);
        if (flag) TetrisRule.changeShape(this._currentTetris, new_shape);
        return flag;
    }

    private move(target: Point): boolean {
        // 判断触底 判断边界
        if (!this._currentTetris || this._gameStatus !== GameStatus.playing) return false;
        if (TetrisRule.canIMove(this._currentTetris.shape, target, this._exist, this._gameWidth, this._gameHeight)) {
            TetrisRule.move(this._currentTetris, target);
            return true;
        }
        return false;
    }

    private generateTetris(centerPoint: Point): Tetris {
        return new Tetris(Utils.getRandomMember(TetrisShape), centerPoint, Utils.getRandomMember(TetrisColors))
    }

    private autoDrop() {
        this._timer = window.setInterval(() => {
            this.drop1();
        }, this._duration);
    }

    public get currentTetris() {
        return this._currentTetris;
    }
    private changeGameStatus(status: GameStatus) {
        if (this._gameStatus === status) return false;
        switch (status) {
            case GameStatus.init:
                this._currentTetris = this.generateTetris(this._mainCenterPoint);
                this._nextTetris = this.generateTetris(this._tipCenterPoint);
                break;
            case GameStatus.finished:
                break;
            case GameStatus.pause:
                break;
            case GameStatus.playing:
                break;
            default:
                break;
        }
        this._gameStatus = status;
    }
}