/**
 * 使用ES6中的新特性：Set, Proxy, Reflect 实现观察者模式
 */
const queueObservers = new Set()    // 定义一个记录所有观察者函数的集合

const observe = fn => queueObservers.add(fn)    // 将观察者函数添加到集合中
const observable = obj => new Proxy(obj, {set}) // 为每个obj添加Proxy代理，拦截赋值操作

function set(target, key, value, reciever) {
    const result = Reflect.set(target, key, value, reciever)
    queueObservers.forEach(observer => observer())

    return result
}