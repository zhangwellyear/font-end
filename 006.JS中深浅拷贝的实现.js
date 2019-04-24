/**
 * 数组的浅拷贝
 * 来源：https://github.com/mqyqingfeng/Blog/issues/32
 */
// 利用数组的一些方法，如：slice、concat
// var arr = ['old', 1, true, null, undefined];
// // var new_arr = arr.slice(); 或
// var new_arr = arr.concat();

// new_arr[0] = 'new';

// console.log(arr);   // ["old", 1, true, null, undefined]
// console.log(new_arr);   // ["new", 1, true, null, undefined]


/**
 * 当数组中嵌套了对象或数组之类的引用类型数据时，结果就大不相同了
 */
var arr = [{old: 'old'}, ['old']];
var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr);       // [{old: 'new'}, ['new']]
console.log(new_arr);   // [{old: 'new'}, ['new']]


/**
 * 有个技巧可以深拷贝一个数组或对象
 */
var arr = [{old: 'old'}, ['old']];
var new_arr = JSON.parse(JSON.stringify(arr));

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr);       // [ { old: 'new' }, [ 'new' ] ]
console.log(new_arr);   // [ { old: 'old' }, [ 'old' ] ]


/**
 * 上面的深拷贝有个问题，无法拷贝函数
 */
var arr = [function () {
    console.log(a)
}, {
    b: function () {
        console.log(b);
    }
}]

var new_arr = JSON.parse(JSON.stringify(arr));
console.log(new_arr);   // [ null, {} ], new_arr的结果并没有被完整的还原


/**
 * 浅拷贝的实现
 * 思路：很简单，遍历对象，然后把属性和属性值都放在一个新的对象
 */
var shallowCopy = function (obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 判断对象是否为数组
    var new_obj = obj instanceof Array? [] : {};
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            new_obj[key] = obj[key];
        }
    }

    return new_obj
}

var arr = [function () {
    console.log(a)
}, {
    b: function () {
        console.log(b);
    }
}];

var new_arr = shallowCopy(arr);
console.log(new_arr);   // [ [Function], { b: [Function: b] } ]


/**
 * 深拷贝的实现（深度优先遍历的方式）
 * 思路：判断一个对象的属性值的类型是否为对象，如果是对象，递归调用深度拷贝函数，实现深拷贝
 */
var deepCopy = function (obj) {
    // 判断obj是否为对象，如果不为对象，则不进行拷贝
    if (typeof obj !== 'object') return;
    // 判断obj对象是否为数组
    var new_obj = obj instanceof Array ? [] : {};
    for (key in obj)  {
        if (obj.hasOwnProperty(key)) {
            new_obj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }

    return new_obj;
}