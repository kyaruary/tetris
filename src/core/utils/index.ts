export class Utils {
    // 获取数组内随机成员
    public static getRandomMember<T>(array: Array<T>) {
        return array[Math.floor(Math.random() * array.length)];
    }
}