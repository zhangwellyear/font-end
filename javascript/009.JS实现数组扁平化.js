/**
 * 来源：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8
 */
var arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
// var r_arr = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {return a-b});    // arr.flat比较新
// console.log(r_arr);

var r_arr = arr.toString().split(',').sort((a, b) => {
    return a - b
});
console.log(r_arr);

/**
 * 另外实现数组扁平化的来源为：
 * https://github.com/mqyqingfeng/Blog/issues/36
 */
// 第一种: 递归的方式
// 循环数组元素，如果元素还是数组，递归调用进行循环
let arr = [1, [2, [3, 4]]];

function flatten (arr) {
    let len = arr.length;
        result = []

    for (let i = 0; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }

    return result;
}

// 第二种: 递归使用 ...arg 的方式
function flatten2 (arr) {    
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }

    return arr;
}

// console.log(flatten2(arr))

// 第三种：使用 reduce 实现
function flatten3 (arr) {
    return arr.reduce((prev, curr) => {
        return prev.concat(Array.isArray(curr) ? flatten3(curr) : curr)
    }, [])
}

console.log(flatten3(arr))