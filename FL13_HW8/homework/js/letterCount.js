function letterCount(string,letterToCount){
    return string.toLowerCase().split(letterToCount).length - 1
}
console.log(letterCount("Maggy", "g"))
console.log(letterCount("Barry", "b"))
console.log(letterCount("", "z"))