function validateInput(str) {
    return str.replace(/\s/g, '').length !== 0 && str !== ''
}
function findMiddleCharacter(word) {
    if (word.length % 2 === 0) {
        return word[word.length / 2 - 1] + word[word.length / 2]
    } else {
        return word[Math.ceil(word.length / 2) - 1];
    }
}
let word = prompt('Input a word');
if (validateInput(word)) {
    alert(findMiddleCharacter(word))
} else {
    alert('Invalid value')
}
