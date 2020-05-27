const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const header = document.createElement('h1');
header.textContent = 'Manage User App';
appContainer.appendChild(header);
function createListOfUsers(data){
    const ul = document.createElement('ul');
    ul.id = 'usersList';
    for (let i=0; i < data.length; i++){

      ul.appendChild(addUserToList(data[i].id,data[i].name, data[i].username));
    }
    return ul;
  }
function addUserToList(id,name,username){
    let li = document.createElement('li');
      li.id = id;
      let nameInput = document.createElement('input');
      let userNameInput = document.createElement('input');
      let updateButton = document.createElement('input');
      let deleteButton = document.createElement('input');
      let idName = document.createElement('span');
      idName.innerHTML = id;
      nameInput.type = 'text';
      nameInput.required = true;
      userNameInput.required = true;
      userNameInput.type = 'text';
      nameInput.value = name;
      userNameInput.value = username;
      updateButton.type = 'button';
      updateButton.class = 'update';
      deleteButton.class = 'delete';
      deleteButton.addEventListener('click',function(event){
        deleteUserFromDatabase(event.target.parentNode.id,event.target)
      })
      updateButton.addEventListener('click',function(event){
        updateUserFromDatabase(event.target.parentNode.id,event.target);
      })
      updateButton.value = 'update';
      deleteButton.value = 'delete';
      deleteButton.type = 'button';
      li.appendChild(idName);
      li.appendChild(nameInput);
      li.appendChild(userNameInput);
      li.appendChild(updateButton);
      li.appendChild(deleteButton);
      return li;
}

function deleteUserFromDatabase(id,button){
    let httpRequest = new XMLHttpRequest();
    let usersList = document.getElementById('usersList');
    httpRequest.addEventListener('loadstart',function(){
        button.parentNode.childNodes.forEach(elem => {
            if (elem.tagName === 'INPUT' && elem.type ==='button'){
                elem.disabled = true;
            }
        })
    })
    httpRequest.addEventListener('loadend',function(){
        let httpReqForList = new XMLHttpRequest();
        httpReqForList.addEventListener('loadend',function(){
            appContainer.replaceChild(createListOfUsers(JSON.parse(httpReqForList.responseText)),usersList)
        })
        httpReqForList.open('GET', baseUrl+'/users', true);
        httpReqForList.send()

    })
    httpRequest.open('DELETE', baseUrl+`/users/${id}`, true);
    httpRequest.setRequestHeader('Authorization', 'admin');
    httpRequest.send()
}
function updateUserFromDatabase(id,button){
    let httpRequest = new XMLHttpRequest();
    let usersList = document.getElementById('usersList');
    httpRequest.addEventListener('loadstart',function(){
        button.parentNode.childNodes.forEach(elem => {
            if (elem.tagName === 'INPUT' && elem.type ==='button'){
                elem.disabled = true;
            }
        })
    })
    let updatedUser = {};
    updatedUser.name = button.parentNode.childNodes[1].value;
    updatedUser.username = button.parentNode.childNodes[2].value;
    console.log(updatedUser);
    httpRequest.addEventListener('loadend',function(){
        let httpReqForList = new XMLHttpRequest();
        httpReqForList.addEventListener('loadend',function(){
            appContainer.replaceChild(createListOfUsers(JSON.parse(httpReqForList.responseText)),usersList)
        })
        httpReqForList.open('GET', baseUrl+'/users', true);
        httpReqForList.send()

    })
    httpRequest.open('PUT', baseUrl+`/users/${id}`, true);
    httpRequest.setRequestHeader('Content-type', 'application/json');
    httpRequest.send(JSON.stringify(updatedUser));
}
function createUserForm(){

    let nameInput = document.createElement('input');
    let userNameInput = document.createElement('input');
    let addNewUser = document.createElement('input');
    addNewUser.addEventListener('click',addNewUserRequest);
    let form = document.createElement('form');
    addNewUser.id = 'addNewUser';
    addNewUser.value = 'Add New User'
    addNewUser.type = 'submit';
    nameInput.type = 'text';
    userNameInput.type = 'text';
    nameInput.required = true;
    userNameInput.required = true;
    nameInput.placeholder = 'Name';
    userNameInput.placeholder = 'Full Name';
    nameInput.id = 'Name';
    userNameInput.id = 'UserName';

    form.appendChild(nameInput);
    form.appendChild(userNameInput);
    form.appendChild(addNewUser);
    appContainer.appendChild(form);
}

function loadListFromServer(){
    let httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('loadstart',function(){
    let p = document.createElement('p');
      p.id = 'loading';
      p.innerHTML = 'loading...';
      appContainer.appendChild(p);
    }
    )
    httpRequest.addEventListener('loadend',function(){
        let loader = document.getElementById('loading');
        loader.parentNode.removeChild(loader);
        appContainer.appendChild(createListOfUsers(JSON.parse(httpRequest.responseText)))
    })
    httpRequest.open('GET', baseUrl+'/users', true);
    httpRequest.send()
}

function loadLastUserFromServer(){
    let httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener('loadend',function(){
        let usersList = document.getElementById('usersList');
        let lastUser = JSON.parse(httpRequest.responseText)[JSON.parse(httpRequest.responseText).length-1];
        usersList.appendChild(addUserToList(lastUser.id,lastUser.name,lastUser.username));
    })
    httpRequest.open('GET', baseUrl+'/users', true);
    httpRequest.send()

}

function addNewUserRequest(){
    let httpRequest = new XMLHttpRequest();
    let newUser = {};
    let name = document.getElementById('Name');
    let username = document.getElementById('UserName');
    let butAdd;
    newUser.name = name.value;
    newUser.username = username.value;
    if (name.value && username.value){
        httpRequest.addEventListener('loadstart',function(){
            butAdd = document.getElementById('addNewUser');
            butAdd.disabled = true;
         }
         )
         httpRequest.addEventListener('loadend',function(){
             let name = document.getElementById('Name');
             let username = document.getElementById('UserName');

             loadLastUserFromServer();
             butAdd.disabled = false;
             name.value = '';
             username.value = '';

         })
         httpRequest.open('POST', baseUrl+'/users', true);
         httpRequest.setRequestHeader('Content-type', 'application/json');

         httpRequest.send(JSON.stringify(newUser));
    }

}

createUserForm();
loadListFromServer();
