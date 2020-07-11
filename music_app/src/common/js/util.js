//获取min到max的随机整数
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//打乱数组顺序，原理是随机每遍历一次数组就随机一个范围内的整数j，将arr[i]和arr[j]的值交换
export function shuffle(arr) {
    for(let i=0; i<arr.length; i++){
        let j = getRandomNum(0, i);
        let t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
    return arr;
}
