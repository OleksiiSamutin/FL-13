const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
function createMenu(left, top){
  let ul = document.createElement('ul');
  let renameBut = document.createElement('li');
  let deleteBut = document.createElement('li');
  renameBut.innerHTML = 'Rename';
  deleteBut.innerHTML = 'Delete item';
  renameBut.id ='rename';
  deleteBut.id = 'delete';
  renameBut.classList.add('hover')
  deleteBut.classList.add('hover')
  ul.appendChild(renameBut);
  ul.appendChild(deleteBut);
  ul.style=`top: ${top-25}px; left: ${left-5}px`;
  return ul;
}
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  let x = event.clientX;
  let y = event.clientY;
  let ul = document.querySelector('ul')
  console.log(event.target)
  if (document.querySelector('ul')){
    document.body.removeChild(ul)
  }
  ul = createMenu(x,y)
  document.body.appendChild(ul);
  if (event.target.tagName === 'HTML' || event.target.tagName === 'BODY' ||
  event.target.id==='root'){
    ul.style.pointerEvents = 'none';
    ul.style.color = '#cfcfcf';
  }
  return false;
}, false);
document.addEventListener('click', function(){
  let element = document.querySelector('ul');
  if (document.querySelector('ul')){
    element.parentNode.removeChild(element);
  }
})
function createFoder(structureObj, parentFolder, empty = false) {
  let folderBlock = document.createElement('div');
  let folderHover = document.createElement('p');
  if (empty) {
    folderHover.className = 'empty folder-hover';
    folderHover.style = parentFolder === rootNode ? 'display: block' : 'display: none';
    folderHover.innerHTML = 'Folder is empty';
    folderBlock.appendChild(folderHover);
    parentFolder.appendChild(folderBlock);
    return folderBlock;
  } else {

    folderHover.style = parentFolder === rootNode ? 'display: block' : 'display: none';
    let icon = document.createElement('i');
    let text = document.createElement('span');
    folderBlock.className = 'folder-block';
    folderBlock.classList.add('canOpen');
    folderHover.className = 'folder-hover';
    icon.className = 'material-icons icon folder';
    text.className = 'text';
    icon.innerHTML = 'folder';
    text.innerHTML = structureObj['title'];
    folderHover.appendChild(icon);
    folderHover.appendChild(text);
    folderBlock.appendChild(folderHover);
    parentFolder.appendChild(folderBlock);

    return folderBlock;
  }
}

function createFile(structureObj, parentFolder) {
  let folderBlock = document.createElement('div');
  let folderHover = document.createElement('p');
  folderHover.style = parentFolder === rootNode ? 'display: block' : 'display: none';
  let icon = document.createElement('i');
  let text = document.createElement('span');
  folderBlock.className = 'folder-block';
  folderHover.className = 'folder-hover';
  icon.className = 'material-icons icon file';
  text.className = 'text';
  icon.innerHTML = 'insert_drive_file';
  text.innerHTML = structureObj['title'];
  folderHover.appendChild(icon);
  folderHover.appendChild(text);
  folderBlock.appendChild(folderHover);
  parentFolder.appendChild(folderBlock);
  return folderBlock;
}

function obxodDereva(children, currentFolder) {
  if (children === null || children === false) {
    createFoder(children, currentFolder, true);
    return;
  }
  children.forEach((element) => {
    if (element['folder'] === true) {
      obxodDereva(
        element['children'],
        createFoder(element, currentFolder)
      );
    } else {
      createFile(element, currentFolder);
    }
  });
}
obxodDereva(data, rootNode);

let folderHover = document.querySelectorAll('.folder-hover');
let folder = document.querySelectorAll('.text');
folder.forEach = (txt =>{
  txt.onclick = function(event){
    alert(event.target);
  }
})
folderHover.forEach(folder => {
  folder.onclick = function (event) {
    if (this.parentElement.classList.contains('canOpen')){
      if (!this.parentElement.classList.contains('open')){

        for (let i = 1; i <this.parentElement.children.length; i++){
          this.parentElement.children[i].style = 'display: block';
          this.parentElement.children[i].children[0].style = 'display: block';
        }
        this.firstChild.innerHTML = 'folder_open';
        this.parentElement.classList.add('open');
      } else {
        this.firstChild.innerHTML = 'folder';
        console.log(event.target.firstChild);
        this.parentElement.classList.remove('open');
        for (let i = 1; i <this.parentElement.children.length; i++){
          this.parentElement.children[i].style = 'display: none';
        }
      }
    }
  }
})