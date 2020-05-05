const SECONDS_IN_MINUTE = 3600;
const HOURS_IN_DAY = 24;
const MS_IN_SECOND = 1000;
const _10 = 10;
const _20 = 20;
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
        return el > _10 && el < _20 ? '*' : el;
    })
}

function getPastDay(date, dayAgo) {
    let oneDay = SECONDS_IN_MINUTE * HOURS_IN_DAY * MS_IN_SECOND;
    let result = new Date(date - dayAgo * oneDay)
    return result.getDate();
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = (date.getHours() < _10 ? '0' : '') + date.getHours();
    let minutes = date.getMinutes();

    return `${year}/${month}/${day} ${hour}:${minutes}`;
}
