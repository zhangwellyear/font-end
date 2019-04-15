// 文章来源：https://github.com/mqyqingfeng/Blog/issues/11
/**
 * apply的实现和call基本一致，除了参数的处理不太相同之外
 */
Function.prototype.apply2 = function (context, arr) {
    var context = context || global;
    context.fn = this;
    
    if (!arr) return context.fn();
    var args = [];

    for (var i = 0; i < arr.length; i++) {
        args.push("arr[" + i + "]");
    }

    var result = eval("context.fn(" + args + ")");
    delete context.fn;

    return result;
}

// 测试
console.log(Math.max.apply(null, [1, 2, 3, 4]));    // 4
console.log(Math.max.apply2(null, [1, 2, 3, 4]));   // 4