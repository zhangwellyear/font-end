// 这里附上原答案链接：https://www.zhihu.com/question/275792654（柯南的回答）
// 作者链接：(https://www.zhihu.com/people/ke-nan-34-75-69)
/**
 * 1. 利用ES6 Set去重
 */
function unique (arr) {
    return Array.from(new Set(arr));
}

var arr = [1, 1, 'true', 'true', 15, 15, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];

console.log(unique(arr));   // [ 1, 'true', 15, false, undefined, null, NaN, 'NaN', 0, 'a', [], [], {}, {}]
// 以上结果可以看到基本类型和NaN类型的数据可以去重，引用类型的数据，没有实现去重

/**
 * 2. 利用indexOf去重
 */
function unique (arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }

    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i]);
        }
    }

    return array;
}

var arr = [1, 1, 'true', 'true', 15, 15, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];

console.log(unique(arr));   // [ 1, 'true', 15, false, undefined, null, NaN, NaN, 'NaN', 0, 'a', [], [], {}, {}]

// // 从以上结果可知，NaN和引用类型的值，无法去除

/**
 * 3. 利用sort()函数排序后去重
 */
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error');
        return;
    } else if (arr.length <= 1) {
        return arr;
    }

    arr = arr.sort();
    var r_arr = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            r_arr.push(arr[i]);
        }
    }

    return r_arr;
}

var arr = [1, 1, 'true', 'true', 15, 15, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];

console.log(unique(arr));   // [ [], [], 0, 1, 15, NaN, NaN, 'NaN', {}, {}, 'a', false, null, 'true', undefined ]

// // NaN和引用类型的值没有去重

/**
 * 4. 利用对象属性不能相同的特点进行去重
 */
function unique (arr) {
    if (!Array.isArray(arr)) {
        console.log('type error');
        return;
    }

    var r_arr = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            r_arr.push(arr[i]);
            obj[arr[i]] = 1;    
        } else {
            obj[arr[i]]++;
        }
    }

    return r_arr;
}

var arr = [1, 1, 'true', 'true', 15, 15, true, true, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];

console.log(unique(arr));   // [ 1, 'true', 15, false, undefined, null, NaN, 0, 'a', [], {} ]
// // 从以上结果可以看出，true被直接去除掉, NaN和引用类型的值，都得到了很好的去重

/**
 * 5. 利用includes去重
 */
function unique (arr) {
    if (!Array.isArray(arr)) {
        console.log('type error');
        return;
    }

    var r_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!r_arr.includes(arr[i])) {
            r_arr.push(arr[i]);
        }
    }

    return r_arr;
}

var arr = [1, 1, 'true', 'true', 15, 15, true, true, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];

console.log(unique(arr));   // [ 1, 'true', 15, false, undefined, null, NaN, 0, 'a', [], {} ]
// 引用类型的值没有去除，与indexOf相比，NaN得到了去重

/**
 * 6. hasOwnProperty去重
 */
function unique (arr) {
    var obj = {};
    return arr.filter(function (item, idx, arr) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
    })
}

var arr = [1, 1, 'true', 'true', 15, 15, true, true, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];

console.log(unique(arr));   // [ 1, 'true', 15, true, false, undefined, null, NaN, 'NaN', 0, 'a', [], {} ]
// 全部进行了去重，这个去重效果最好

/**
 * 7. 利用filter进行去重
 */
function unique (arr) {
    return arr.filter(function (item, idx, arr) {
        // 在原始数组中的第一个索引 === 当前索引，否则返回当前元素
        return arr.indexOf(item, 0) === idx;
    })
}

var arr = [1, 1, 'true', 'true', 15, 15, true, true, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];
console.log(unique(arr));   // [ 1, 'true', 15, true, false, undefined, null, 'NaN', 0, 'a', [], [], {}, {} ]
// 由以上结果可知，引用类型的值未去重

/**
 *8. 利用Map去重
 */
function unique (arr) {
    var map = new Map();
    var r_arr = new Array();

    for (var i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], true);
        } else {
            map.set(arr[i], false);
            r_arr.push(arr[i]);
        }
    }

    return r_arr;
}

var arr = [1, 1, 'true', 'true', 15, 15, true, true, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];
console.log(unique(arr));   // [ 1, 'true', 15, true, false, undefined, null, NaN, 'NaN', 0, 'a', [], [], {}, {} ]
// 引用类型得不到去重，Map数据结构中不会出现相同的key值

/**
 * 9. 利用reduce + includes
 */
function unique (arr) {
    return arr.reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, curr], []);
}

var arr = [1, 1, 'true', 'true', 15, 15, true, true, false, false, undefined, undefined, null, null, 
            NaN, NaN, 'NaN', 0, 0, 'a', 'a', [], [], {}, {}];
console.log(unique(arr));   // [ 1, 'true', 15, true, false, undefined, null, NaN, 'NaN', 0, 'a', [], [], {}, {} ]
// 引用类型得不到去重，Map数据结构中不会出现相同的key值