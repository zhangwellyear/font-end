/**
 * 判断 obj2 是否为 obj1 的原型
 * @param {待判断的对象} obj1 
 * @param {对象可能的原型} obj2 
 */
function instanceof2 (obj1, obj2) {
    var obj2_prototype = obj2.prototype;

    var obj1_proto = obj1.__proto__;    // 获取 obj1 的隐式原型
    while (true) {
        if (obj1_proto === null) return false;
        // 当 obj1 的隐式 __proto__ 属性严格等于 obj2 的显式原型 prototype时，返回 true
        else if (obj1_proto === obj2_prototype) return true;

        obj1_proto = obj1.__proto__;
    }
}