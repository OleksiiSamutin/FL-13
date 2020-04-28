
function isBigger(a,b){
    return a>b;
}
function countPoints(scoreCollection) {
    return scoreCollection.map(elem => elem.split(":")).map(elem =>{
        if (isBigger(elem[0],elem[1])){
            return 3
        } else if(elem[0] === elem[1]) {
            return 1
        } else {
            return 0
        }
    }).reduce((a,b)=>a+b)

}
console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0'])) // => 17
console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0'])) // => 12
