let login = prompt('Enter your login');
const userPassword = 'UserPass'
const adminPassword = 'RootPass'
const currentHours = new Date().getHours()
if (login === '' || login === null){
    alert('Canceled')
} else if (login.length < 4){
    alert('I don\'t know any users having name length less than 4 symbols')
} else if(login === 'User' || login ==='Admin'){
    let promptPass = prompt(`Dear ${login}, Enter your password`)
    if (login === 'User' && promptPass === userPassword || login === 'Admin' && promptPass === adminPassword){
        if (currentHours < 20 ){
            alert(`Good day, dear ${login}`)
        } else {
            alert(`Good evening, dear ${login}`)
        }
    } else {
        alert('Wrong password')
    }
} else {
    alert('I don\'t know you')
}