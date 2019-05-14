/**
 * 冒泡排序
 * 思路: 从 i = 0开始，每轮冒泡排序中，每次都比较相邻两个元素 (i 与 i + 1)，逆序的进行交换
 * @param {输入的数组} arr 
 */
function bubbleSort(arr) {
    let l = arr.length,
        tmp,
        flag

    for (let j = l; j > 0; j--) {
        flag = 0
        for (let i = 0; i < j - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                tmp = arr[i + 1]
                arr[i + 1] = arr[i]
                arr[i] = tmp

                flag = 1
            }
        }

        // 当标记为 0 时，证明没有进行一次交换，也就是所有数据都是有序的
        if (flag === 0) break
    }

    return arr
}


/**
 * 插入排序
 * 思路: 第一次插入从第二个元素开始，当前已经排好的元素大于待插入的元素时，则将这些较大的元素后移，腾出位置 j 给当前待插入的元素
 * @param {输入数组} arr 
 */
function insertionSort(arr) {
    let l = arr.length

    for (let i = 1; i < l; i++) {
        let j,
            tmp = arr[i]

        for (j = i; j > 0 && arr[j - 1] > tmp; j--) {
            arr[j] = arr[j - 1]
        }

        arr[j] = tmp
    }

    return arr
}


/**
 * 希尔排序
 * 思路: 希尔排序是插入排序的进化，只是希尔排序的过程中，间隔从大到小
 * @param {输入数组} arr 
 */
function shellSort(arr) {
    let interval = 5,
        l = arr.length

    while (interval >= 1) {
        for (let i = 0; i < l; i += interval) {
            let j,
                tmp = arr[i]

            for (j = i; j >= interval && arr[j - interval] > tmp; j -= interval) {
                arr[j] = arr[j - interval]
            }

            arr[j] = tmp
        }

        interval = Math.floor(interval / 2)
    }

    return arr
}


/**
 * 快速排序
 */
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    var pivotIdx = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIdx);

    var left = [],
        right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= pivot) right.push(arr[i]);
        else left.push(arr[i]);
    }

    return quickSort(left).concat(pivot, ...quickSort(right));
}

let arr = [1, 34, 14, 44, 32, 21, 52, 26]

console.log(bubbleSort(arr))
console.log(insertionSort(arr))
console.log(shellSort(arr))
console.log(quickSort(arr, 0, arr.length));