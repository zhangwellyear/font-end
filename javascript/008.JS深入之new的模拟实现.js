/**
 * new 实现的功能
 * 来源：https://github.com/mqyqingfeng/Blog/issues/13
 */
// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;
    
    this.habit = "Game";
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku ('Lynn', 18);

console.log(person.name);   // Lynn
console.log(person.age);    // 18
console.log(person.habit);  // Game

// person.sayYourName();   // I am Lynn
/**
 * new 的作用：
 * 1. 访问到Otaku构造函数中的属性；
 * 2. 访问到Otaku.prototype中的属性
 */


 /**
  * 使用objectFactory函数模拟new
  * 初步实现版本
  */
// 第一版
function objectFactory () {
    var obj = new Object();     // 定义一个要返回的对象

    var Contructor = [].shift.call(arguments);  // 第一个参数即为构造函数
    obj.__proto__ = Contructor.prototype; // obj的__proto__属性指向Contructor.prototype
    Contructor.apply(obj, arguments);  // 改变this指向为obj。注意：此时的arguemnts已经不再含有第一个构造函数

    return obj;
}

// 测试
function Otaku (name, age) {
    this.name = name;
    this.age = age;
    
    this.habit = "Game";
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = objectFactory(Otaku, 'Kevin', 18);

console.log(person.name);   // Lynn
console.log(person.age);    // 18
console.log(person.habit);  // Game

person.sayYourName();   // I am Lynn


/**
 * 返回效果的实现
 */
// new的例子
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: "Game"
    }
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log(this.name);
}

var person = new Otaku('Kevin', 18);

console.log(person.habit);  // Game
console.log(person.name);   // Kevin
console.log(person.age);    // undefined
console.log(person.strength);   // undefined
// 在实例中只能访问返回的对象中的属性，原型中和未返回的数据，都是undefined

/**
 * 假如在构造函数中返回一个基本类型的值
 */
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    return 'handsome boy';
}

Otaku.prototype.strength = 60;
var person = new Otaku('Kevin', 18);

console.log(person.name);       // Kevin
console.log(person.age);        // 18
console.log(person.strength);   // 60
// 原型和构造函数中的数据，全部返回，返回的值并没有

/**
 * 引用《JavaScript语言精粹》中的话
 * 如果在函数前加上 new 前缀的方式来调用函数，且返回值不是一个对象，则返回 this（当前对象）
 */

// 需要判断一下，返回的值是不是一个对象，如果是一个对象，返回这个对象，不是，直接返回
// 第二版代码
function objectFactory () {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);  // 获取contructor
    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;
}