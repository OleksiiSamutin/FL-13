function positiveSum(array) {
    return array.filter(elem => elem > 0).reduce((a, b) => a + b);
}

console.log(positiveSum([2, 4, 6, 8])) // => 20
console.log(positiveSum([0, -3, 5, 7])) // => 12
