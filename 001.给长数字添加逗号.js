/**
 * 实现给一个数字，每三位加一个逗号
 * @param {*} 输入的数字
 */
function add_douhao(num) {
    let str_num = num.toString();   // 将数字转化为字符串，此处的字符串，还存在会将长数字转换为科学计数法的字符串，从而导致转换结果不正确
    if (str_num.length <= 3) return str_num;
    else {
        let r_str = '';
        let num_len = str_num.length;
        
        while (num_len > 3) {   // 当数据长度大于3，证明还需要加逗号
            r_str = ',' + str_num.substr(num_len-3, 3) + r_str;
            num_len -= 3;
        }

        r_str = str_num.substr(0, num_len) + r_str; // 将最后剩余的数字放在最前面
        return r_str;
    }
}

console.log(add_douhao(1234567894133431341));