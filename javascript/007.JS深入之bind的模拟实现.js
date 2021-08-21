/**
 * bind()方法会返回一个新函数，bind()的第一个参数将作为它运行时的this，之后的一系列参数将会在传递的实参前传入作为它的参数
 * bind函数的两个特点:
 * 1. 返回一个函数
 * 2. 可以传入参数
 */

/**
 * bind()函数应用的例子
 */
//  var foo = {
//      value: 1
//  };

// var bar = function () {
//     console.log(this.value);
// }

// // 返回了一个函数
// var bindBar = bar.bind(foo);    // 第一个参数作为运行时的this

// bindBar();  // 1，bindBar函数的this，即为foo

/**
 * 可以应用call或者apply实现
 * 第一版：使用apply实现bind
 */
// Function.prototype.bind2 = function (context) {
//     var self = this;

//     return function () {
//       return self.apply(context);
//     }
// }

// // 测试
// var foo = {
//   value: 1
// };

// function bar() {
//   return this.value;
// }

// var bindFoo = bar.bind2(foo);
// console.log(bindFoo());   // 1

/**
 * 第二版：第一版的代码缺少参数
 */
// bind可以传参的例子
// var foo = {
//   value: 1
// };

// function bar(name, age) {
//   console.log(this.value);
//   console.log(name);
//   console.log(age);
// }

// var bindFoo = bar.bind(foo, 'daisy');
// bindFoo('18');
// // 1
// // daisy
// // 18

// 第二版
// Function.prototype.bind2 = function (context) {
//   var self = this;
//   // 此时的arguments是调用bind2的函数传入的参数，第一个参数是对象，从第二个之后才是真正的参数
//   var args = Array.prototype.slice.call(arguments, 1);

//   return function () {
//     // 此时返回的arguments是bind返回的函数传入的参数
//     var bindArgs = Array.prototype.slice.call(arguments);
//     return self.apply(context, args.concat(bindArgs));
//   }
// }

// var foo = {
//   value: 1
// };

// function bar(name, age) {
//   console.log(this.value);
//   console.log(name);
//   console.log(age);
// }

// var bindFoo = bar.bind2(foo, 'daisy');
// bindFoo('18');

/**
 * 构造函数效果的模拟
 * 一个绑定函数也能使用new操作符创建对象
 */
// bind使用new操作符创建对象示例
var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'Kevin';

var bindFoo = bar.bind(foo, 'daisy');
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin

// 第三版
Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当该函数作为构造函数时，this指向实例，此时结果为true;
    // 将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值;
    // 当作为普通函数时，this指向window，此时结果为false，将绑定函数的this指向context
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }

  fBound.prototype = this.prototype;

  return fBound;
}


// 最终代码
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fBound ? this : window, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}