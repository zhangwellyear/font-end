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