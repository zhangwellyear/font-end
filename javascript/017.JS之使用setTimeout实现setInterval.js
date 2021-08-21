/**
 * 思路：当setTimeout执行结束后，再次调用setTimeout，将新的函数执行通过setTimeout放到执行栈中
 */

// 第一版
function mySetInterval(func, wait) {
    function interval() {
        // 该闭包函数包含了一个函数执行，函数执行处于主线程，所以会立即执行，同时将自身（函数）添加到setTimeout中
        setTimeout(interval, wait)
        func() // 函数执行
    }

    setTimeout(interval, wait)
}

// mySetInterval(function () {
//     console.log(+new Date())
// }, 1000)

// 第二版：我们可以指定参数的次数，并添加容错机制
function mySetInterval2(func, wait, count) {
    function exec() {
        setTimeout(interval, wait)
        try {
            func()
        } catch (e) {
            count = 0
            throw e.toString()
        }
    }

    function interval() {
        if (typeof count !== 'number') {
            exec()
        } else if (typeof count === 'number' && count-- > 0) {
            exec()
        }
    }

    setTimeout(interval, wait)
}

mySetInterval2(function () {
    console.log(+new Date())
}, 1000)