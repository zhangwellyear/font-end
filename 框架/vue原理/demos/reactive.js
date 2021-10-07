function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return;
            val = newVal;
        }
    })
}