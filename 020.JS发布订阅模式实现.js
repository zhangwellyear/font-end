/**
 * 
 *  JS发布订阅模式的实现
    [该题目记录大部分参考于博文](https://www.cnblogs.com/leaf930814/p/9014200.html)
发布/订阅模式，基于一个主题/事件通道

### 订阅者模式与观察者模式的区别
+ 1. Observer模式，只要内容改变，所有的观察者都会收到内容改变的消息，这是一个一对多的关系，即观察者（多）和被观察者（一）之间的关系；
+ 2. Publish/Subscribe模式使用了一个主题/事件通道，这个通道介于订阅者/发布者之间；
+ 3. 观察者模式里，观察者必须执行内容改变的事件；发布订阅模式下，订阅者可以自己决定订阅什么内容；
+ 4. 观察者模式，两个对象之间有很强的依赖关系；发布/订阅者模式两个对象之间的耦合度低。

下面给个发布/订阅模式的demo
*/

function Public () {
    this.handlers = {};
}

Public.prototype = {
    // 订阅事件
    on: function (eventType, handler) {
        var self = this;
        if (!(eventType in self.handlers)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
    },

    // 触发事件
    emit: function (eventType) {
        var self = this;
        var handleArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < self.handlers[eventType].length; i++) {
            self.handlers[eventType][i].apply(self, handleArgs);
        }

        return self;
    },

    // 删除订阅事件
    off: function (eventType, handler) {
        if (!(eventType in handler)) return;

        var currHandler = this.handlers[eventType];
        var len = currHandler.length;
        if (currHandler) {
            for (var i = 0; i < len; i++) {
                if (currHandler[i] === handler) {
                    currHandler.splice(i, 1);   // 将currHandler中所有的handler订阅事件全部删除
                }
                // 或者使用下面的方式
                // var idx = currHandler.indexOf(handler);
                // currHandler.splice(idx, 1);
            }
        }

        return this;
    }
};

var Publisher = new Public();

// 订阅事件a
Publisher.on('a', function (data) {
    console.log(1 + data);
});

Publisher.on('a', function (data) {
    console.log(2 + data);
});

// 触发事件
Publisher.emit('a', '我是第1次调用的参数');
Publisher.emit('a', '我是第2次调用的参数');

// 其他实现
// https://github.com/addyosmani/pubsubz/blob/master/pubsubz.js
