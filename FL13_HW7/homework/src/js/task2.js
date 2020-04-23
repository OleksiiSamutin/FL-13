let userInput = confirm('Do you want to play a game?');
let playAgain = true;
if (!userInput){
    alert('You did not become a billionaire, but can.')
}
function genRandom(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
outer:while (playAgain && userInput){
    let max = 5;
    let min = 0;
    let attempts = 3;
    let maxPrize = 100
    let totalPrize = 0;
    let possiblePrize = maxPrize;
    let randomNumber = genRandom(min,max)
    while (attempts > 0){
        const userGuessNumber = prompt(`Choose a roulete pocket number from ${min} to ${max}
        Attempts left: ${attempts}
        Total prize: ${totalPrize}$
        Possible prize on current attempt: ${possiblePrize}$
        random number is ${randomNumber}`,'')
        if (Number(userGuessNumber) === randomNumber){
            totalPrize += possiblePrize
            let userChoice = confirm(`Congratulation, you won!
             Your prize is: ${possiblePrize}$. Do you want to continue?’`)
            if (userChoice){
                max*=2
                randomNumber = genRandom(min, max)
                attempts = 3;
                maxPrize*=2;
                possiblePrize = maxPrize;
                continue
            } else {
                alert(`Thank you for your participation. Your prize is: ${totalPrize} $`)
                break outer;
            }
        }
        attempts--
        possiblePrize/=2;
    }
    if (attempts === 0){
        alert(`Thank you for your participation. Your prize is: ${totalPrize} $`)
        if(!confirm('Do you want to play again?')){
            break;
        } else {
            continue
        }
    }
   if(!confirm('Do you want to play again?')){
       break;
   }
}