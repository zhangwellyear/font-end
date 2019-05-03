/**
 * 递归实现（ES5）
 */
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];

while (arr.some(item => Array.isArray(item))) { // 当 arr 中有 包含数组的元素时
    arr = [].concat(arr);
}

/**
 * 递归实现（ES6）
 */
const flatten = array => array.reduce((acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), [])