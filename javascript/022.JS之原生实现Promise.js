/**
 * 题目答案: https://juejin.im/post/5aa7868b6fb9a028dd4de672#heading-8
 */

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function Promise_me(executor) {
    let that = this // 缓存当前 promise 对象
    that.status = PENDING // 初始化 promise 状态
    that.value = undefined
    that.reason = undefined
    that.onFullfilledCallbacks = []
    that.onRejectedCallbacks = []

    function resolve(value) {
        if (that.status === PENDING) {
            that.status = FULLFILLED
            that.value = value
            that.onFullfilledCallbacks.forEach(cb => cb(that.value))
        }
    }

    function reject(reason) {
        if (that.status === PENDING) {
            that.status = REJECTED
            that.reason = reason
            that.onRejectedCallbacks.forEach(cb => cb(that.reason))
        }
    }

    // 捕获在 executor 执行器中抛出的异常
    // new Promise((res, rej) => {
    //     throw new Error('Error!')
    // })
    try {
        executor(resolve, reject)
    } catch {
        reject(e)
    }
}


/**
 * resolve 值的几种情况
 * 1. 普通值
 * 2. promise 对象
 * 3. thenable 对象/函数 
 */

/**
 * 对 resolve 进行改造增强，针对 resolve 中不同的情况 进行处理
 * @param {promise} promise2 promise1.then 方法返回的新的 promise 对象
 * @param {*} x              promise1 中 onFullfilled 的返回值
 * @param {*} resolve        promise2 的 resolve 方法
 * @param {*} reject         promise2 的 reject 方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }

    let called = false // 避免多次引用
    // 如果 x 是一个 promise_me 对象
    if (x instanceof Promise_me) {
        if (x.status === PENDING) { // 如果为等待态，需等待直至 x 被执行或 拒绝，并解析 y 值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reason => {
                reject(reason)
            })
        } else { // 如果 x 已经有状态，则以相同的值传递下去
            x.then(resolve, reject)
        }
    }
    // 如果 x 为对象或者函数 
    else if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try { // 是否是 thenable 对象 （具有 then 方法的对象/函数）
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true
                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}


Promise_me.prototype.then = function (onFullfilled, onRejected) {
    const that = this
    let newPromise

    // 处理参数默认值，保证参数后续能够继续执行
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason
    }

    if (that.status === FULLFILLED) { // 成功状态
        return newPromise = new Promise_me((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFullfilled(that.value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    } else if (that.status === REJECTED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
        });
    } else {
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}

Promise_me.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}


/**
 * Promise.all Promise 进行并行处理
 * 参数：promise 对象组成的数组作为参数
 * 返回值：返回一个 Promise 实例
 * 当这个数组里的所有 promise 对象全部变为 resolve 状态的数据时，才会 resolve
 */
Promise_me.all = function (promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve)
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}

function gen(length, resolve) {
    let count = 0
    let values = []
    return function (i, value) {
        values[i] = value
        if (++count === length) {
            console.log(values)
            resolve(values)
        }
    }
}


/**
 * Promise.raece
 * 参数：接收 promise 对象组成的数组作为参数
 * 返回值：返回一个 Promise 实例
 * 只要有一个 promise 对象进入 Fullfilled 或者 Rejected 状态，就会继续对应函数后面的处理
 */
Promise_me.race = function (promises) {
    return new Promise_me((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve, reject)
        })
    })
}

Promise.resolve = function (value) {
    return new Promise(resolve => {
        resolve(value);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 *
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function () { // 延迟对象
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

/**
 * Promise/A+规范测试
 * npm i -g promises-aplus-tests
 * promises-aplus-tests Promise.js
 */

try {
    module.exports = Promise
} catch (e) {}