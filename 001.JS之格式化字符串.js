/**
 * 实现给一个数字，每三位加一个逗号
 * @param {*} 输入的数字
 */
function add_douhao(num) {
    let str_num = num + '';   // 将数字转化为字符串，此处的字符串，还存在会将长数字转换为科学计数法的字符串，从而导致转换结果不正确
    let dot_part = str_num.split('.')[1]
    let int_part = str_num.split('.')[0]

    if (int_part.length <= 3) return int_part;
    else {
        let r_str = '';
        let num_len = int_part.length;
        
        while (num_len > 3) {   // 当数据长度大于3，证明还需要加逗号
            r_str = ',' + int_part.substr(num_len-3, 3) + r_str;
            num_len -= 3;
        }

        if (dot_part !== undefined) {
            r_str = int_part.substr(0, num_len) + r_str + '.' + dot_part; // 将最后剩余的数字放在最前面
        } else {
            r_str = int_part.substr(0, num_len) + r_str
        }
        return r_str;
    }
}

console.log(add_douhao(1234567.0001));

/**
 * 直接转换的方式
 */
function trans_us(num) {
    return num.toLocaleString('en-US')
}

console.log(trans_us(12343.11));    // 12,343.11

// 当数组长度过长时，无法进行转化
console.log(trans_us(1234567894133431341.111)); // 1,234,567,894,133,430,000