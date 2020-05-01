function convert(...args) {
    let result = [];
    for (let i = 0; i < args.length; i++) {
        result.push(typeof args[i] === 'number' ? String(args[i]) : Number.parseInt(args[i]));
    }
    return result;
}

function executeforEach(array, funct) {

    for (let i = 0; i < array.length; i++) {
        funct(array[i]);

    }
}

function mapArray(array, funct) {
    let arr = []
    executeforEach(array, el => {
        if (typeof el === 'string') {
            arr.push(funct(Number.parseInt(el)))
        } else {
            arr.push(funct(el));
        }

    })
    return arr;
}
function filterArray(array, funct) {
    let result = [];
    executeforEach(array, el => {
        if (funct(el)) {
            result.push(el);
        }
    })
    return result;
}
function containsValue(arr, elemToFind) {
    let result = false;
    executeforEach(arr, el => {
        if (el === elemToFind) {
            result = true;
        }
    })
    return result;
}
function flipOver(string) {
    let result = '';
    for (let i = string.length - 1; i >= 0; i--) {
        result += string[i];
    }
    return result;
}

function makeListFromRange([min,max]) {
    let result = [];
    if (min === max){
        return min;
    }
    for (let i = min; i <= max; i++) {
        result.push(i);
    }
    return result;
}

function getArrayOfKeys(arrayOfObjects, key) {
    let result = [];
    executeforEach(arrayOfObjects, el => result.push(el[key]));
    return result;
}

function substitute(array) {
    return mapArray(array, function (el) {
        return el > 10 && el < 20 ? '*' : el;
    })
}

function getPastDay(date, dayAgo) {
    let oneDay = 3600 * 24 * 1000;
    let result = new Date(date - dayAgo * oneDay)
    return result.getDate();
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutes = date.getMinutes();

    return `${year}/${month}/${day} ${hour}:${minutes}`;
}
//Testing

executeforEach([1, 2, 3], function (el) {
    console.log(el * 2)
}) // 2 4 6

console.log(mapArray([2, '5', 8], function (el) {
    return el + 3
})) // returns [5, 8, 11])

console.log(filterArray(
    [2, 5, 8], function (el) {
        return el % 2 === 0;
    }));

console.log(containsValue([2, 5, 8], 2)) // returns true
console.log(containsValue([12, 4, 6], 5)) // returns false
console.log(flipOver('hey world')) // 'dlrow yeh'
console.log(makeListFromRange([2, 7])) // [2, 3, 4, 5, 6, 7])
console.log(makeListFromRange([3,3]))

const fruits = [{ name: 'apple', weight: 0.5 }, { name: 'pineapple', weight: 2 }];

console.log(getArrayOfKeys(fruits, 'name')); // returns [‘apple’, ‘pineapple’]
console.log(substitute([58, 14, 48, 12, 31, 19, 10])) // returns [58, '*', 48, '*', 31, '*', 10]
const date = new Date(2020, 0, 2);
console.log(getPastDay(date, 1)); // 1, (1 Jan 2020)
console.log(getPastDay(date, 2)); // 31, (31 Dec 2019)
console.log(getPastDay(date, 365)); // 2, (2 Jan 2019)

console.log(formatDate(new Date('6/15/2019 09:15:00'))) // "2018/06/15 09:15"
console.log(formatDate(new Date())) // "2020/04/07 12:56" // gets current local time
