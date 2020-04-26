let inputCheck = prompt('Input a check number', '');
let inputPercentage = prompt('Input a tip percentage', '');
let check = Number(inputCheck);
let percentage = Number(inputPercentage);
const maxPercentage = 100;
function checkCorrectInputNumber(string) {
    return !Number.isNaN(string);
}
if (checkCorrectInputNumber(inputCheck) &&
    checkCorrectInputNumber(inputPercentage) &&
    check > 0 && percentage >= 0 && percentage < maxPercentage) {
        const tipAmount = Number((check * percentage/maxPercentage).toFixed(2))
        const totalSum = check + tipAmount;
        alert(`Check number: ${check}
               Tip: ${percentage}
               Tip amount: ${tipAmount}
               Total sum to pay: ${totalSum}`)

} else {
    alert('Invalid input data');
}