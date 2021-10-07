function defineReactive(data, key, val) {
    let dep = [];

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.push(window.target)
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return;
            for (let i = 0; i < dep.length; i++) {
                dep[i](newVal, val);
            }
            val = newVal;
        }
    })
}