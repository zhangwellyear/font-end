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

/**
 * 深拷贝的实现（广度优先遍历）
 * 来源：https://www.cnblogs.com/rusr/p/8984604.html
 */
function deepClone (data) {
    var obj = {};
    var originQueue = [data];
    var copyQueue = [obj];

    // 以下两个队列用来保存复制过程中访问过的对象，以此来避免对象换的问题（对象的属性值是对象本身）
    var visitedQueue = [];
    var copyVisitedQueue = [];

    while (originQueue.length > 0) {
        var _data = originQueue.shift();
        var _obj = copyQueue.shift();

        visitedQueue.push(_data);
        copyVisitedQueue.push(_obj);

        for (var key in _data) {
            var _value = _data[key];
            if (typeof _value !== 'object') {
                _obj[key] = _value;
            } else {
                // 使用 indexOf 可以发现数组中是否存在相同的对象（实现indexOf的难点在于对象比较
                var index = visitedQueue.indexOf(_value);
                if (index >= 0) {
                    // 出现环的情况不需要再取出遍历
                    _obj[key] = copyVisitedQueue[index];
                } else {
                    originQueue.push(_value);
                    _obj[key] = {}; // 使用_obj[key]来进行对象属性的遍历
                    copyQueue.push(_obj[key]);
                }
            }
        }
    }

    return obj;
}

// 测试
var obj = {
    'a': 123,
    'b': {
        'm': 22,
        'n': {
            'x': 1,
            'y': 2
        }
    }
}

console.log(deepClone(obj));