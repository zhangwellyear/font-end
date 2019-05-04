/**
 * 题目描述：
 * 有这么一个对象: {1: 555, 2: 333, 5: 888}，表示一个公司的销售额
 * 将上面的对象抓换为: [555, 333, null, null, 888, null, null, null, null, null, null, null]
 */
function trans (obj) {
    let length = 12;
    let r_arr = Array.from({length}).map((item, idx) => obj[idx+1] || null);

    return r_arr;
}

console.log(trans({1: 555, 2: 333, 5: 888}));