/**
 * 使用setInterval实现动画
 */
var time = new Date();
function fun () {
    var year = time.getFullYear() + '';
    var month = time.getMonth() + 1 + '';
    var day = time.getDate() + '';
    console.log(year + "-" + month.padStart(2, '0') + "-" + day.padStart(2, '0'));
    time = new Date();
}

setInterval(fun, 1000);

/**
 * 使用 requestAnimation 实现动画
 */
var time = new Date();
function run () {
    var year = time.getFullYear() + '';
    var month = time.getMonth() + 1 + '';
    var day = time.getDate() + '';
    console.log(year + "-" + month.padStart(2, '0') + "-" + day.padStart(2, '0'));
    time = new Date();
    run();
}

window.requestAnimationFrame(run, 1000);