import { Shape } from "../Logic/interface/types";

export const TetrisConfig = {
    width: 12,
    height: 20,
    isClock: true,
    levels: {
        easy: {
            threshold: 300,
            duration: 1500
        },
        normal: {
            threshold: 1000,
            duration: 1000
        },
        hard: {
            threshold: 2000,
            duration: 800
        },
        hell: {
            threshold: 3000,
            duration: 500
        }
    }
}

// 序偶的方式描述七种基本形状 L 田 凸 —— Z 反L 反Z
export const lineShape: Shape = [[0, 0], [0, 1], [0, 2], [0, -1]];  // ——

export const lShape: Shape = [[0, 0], [0, -1], [0, 1], [1, -1]]; // L

export const lMirrorShape: Shape = [[0, 0], [0, -1], [0, 1], [1, 1]];  // 反L

export const zShape: Shape = [[0, 0], [0, -1], [1, 1], [1, 0]]; // Z

export const zMirrorShape: Shape = [[0, 0], [0, 1], [-1, 1], [1, 0]]; // 反Z

export const blockShape: Shape = [[0, 0], [0, 1], [1, 0], [1, 1]]; // 格子

export const nMnShape: Shape = [[0, 0], [-1, 0], [0, 1], [0, -1]]; // 凸  


// 数组形式导出 便于生成随机形状的俄罗斯方块
export const TetrisShape: Shape[] = [
    lineShape,
    lShape,
    lMirrorShape,
    zShape,
    zMirrorShape,
    blockShape,
    nMnShape
]

// 颜色

export const classic = true;
export const TetrisColors = classic ? ['black'] : ['red', 'blue', 'orange', 'green'];
