// 文章来源：https://github.com/mqyqingfeng/Blog/issues/11
/**
 * call方法：使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法
 */
// var foo = {
//     value: 1
// };

// function bar () {
//     console.log(this.value);
// }

// bar.call(foo);  // 1
/**
 * 注意两点：
 * 1. call改变了this的指向，指向到foo;
 * 2. bar函数执行了
 */

 /**
  * 第一版：
  * 思路：将函数设置为指定对象的一个属性，函数执行完毕，删除该属性
  */
Function.prototype.call2 = function (context) { // context为call2函数传入的对象参数
    context.fn = this;  // 将函数设置为context对象的一个属性（fn）
    context.fn();       // 执行函数
    delete context.fn;  // 删除fn属性
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo);     // 1，成功!

/**
 * 第二版：第一版虽然实现了，但是call函数可是能传参的
 * 思路：传参的数量不同，但是我们可以使用arguments对象来接收
 */
Function.prototype.call2 = function (context) {
    context.fn = this;

    var args = [];
    // 因为arguments对象是类数组对象，也有length属性
    for (var i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");  // 将所有参数都放在args数组中
    }

    eval('context.fn(' + args + ')');   // 用字符串把参数数组拼接到函数的括号内，此处args加join与否都行，因为Array.toString()函数默认加","
    delete context.fn;
}

// 测试
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

// bar.call2(foo, 'Zhang', 18);

/**
 * 第三版：不能返回值，也不能传入null作为参数值
 * 思路：加上参数值和返回值就可以
 */
Function.prototype.call2 = function (context) {
    var context = context || global;    // 加上判断，如果是null，则整个context对象是全局对象
    
    context.fn = this;
    var args = [];

    for (var i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i +"]");
    }

    var result = eval('context.fn(' + args + ')');  // 返回结果
    delete context.fn;
    
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2, （在node环境下测试，结果不一样）

console.log(bar.call2(obj, 'kevin', 18));