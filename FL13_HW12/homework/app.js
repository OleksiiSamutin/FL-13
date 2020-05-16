const root = document.getElementById('root');

renderStaticSection();
function validURL(myURL) {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(myURL);
 }
function createEditBtn(id){
    let btn = document.createElement('a');
    btn.innerHTML = 'edit';
    btn.classList.add('btn');
    btn.classList.add('edit');
    btn.href = `/index.html?id=${id}#edit`;
    return btn;
}
function renderStaticSection(){
    let staticDiv = document.createElement('div');
    staticDiv.id = 'static';
    staticDiv.appendChild(createList());
    root.appendChild(staticDiv);
    createList();
}
function recieveBookFromStorage(id){
    if (localStorage.getItem(id)){
        return JSON.parse(localStorage.getItem(id))
    }
}
function loadBookToStorage(book,id=null){
    if (id){
        localStorage.setItem(String(id),JSON.stringify(book))
    } else {
        localStorage.setItem(localStorage.length,JSON.stringify(book))
    }


}
function createList(){
    let ol = document.createElement('ol');
    for(let i=0; i<localStorage.length; i++) {
        let li = document.createElement('li');
        li.id = i + 'n';
        let a = document.createElement('a');
        a.innerHTML = JSON.parse(localStorage.getItem(i)).name;
        a.href = `/index.html?id=${i}#preview`;
        li.appendChild(a);
        li.appendChild(createEditBtn(i));
        ol.appendChild(li);
      }
      let addButton = document.createElement('a');
      addButton.innerHTML = 'add a book';
      addButton.classList.add('btn');
      addButton.classList.add('add');
      addButton.href='/index.html#add';
      ol.appendChild(addButton);
     return ol;
}
function createForm(id = null){
    if (root.childNodes.length >1){
        root.removeChild(root.childNodes[root.childNodes.length-1]);
    }
    const form = document.createElement('form');
    const cancelBtn = document.createElement('input')
    const saveBtn = document.createElement('input');
    const labelForName = document.createElement('label');
    const labelForAuthor = document.createElement('label');
    const labelForImage = document.createElement('label');
    const labelForPlot = document.createElement('label');
    const inputForName = document.createElement('input');
    const inputForAuthor = document.createElement('input');
    const inputForImage = document.createElement('input');
    const inputForPlot= document.createElement('input');
    inputForName.id = 'name';
    inputForAuthor.id = 'author';
    inputForImage.id = 'image';
    inputForPlot.id = 'plot';
    labelForName.setAttribute('for', 'name');
    labelForAuthor.setAttribute('for', 'author');
    labelForImage.setAttribute('for', 'image');
    labelForPlot.setAttribute('for', 'plot');
    labelForName.innerHTML = 'Name';
    labelForAuthor.innerHTML = 'Author';
    labelForImage.innerHTML = 'Image src';
    labelForPlot.innerHTML = 'plot';
    inputForName.required = true;
    inputForAuthor.required = true;
    inputForImage.required = true;
    inputForPlot.required = true;
    cancelBtn.classList.add('btn', 'cancel');
    saveBtn.classList.add('btn', 'save');
    cancelBtn.type = 'reset';
    cancelBtn.value = 'cancel';
    saveBtn.type = 'submit';
    saveBtn.value = 'save';
    saveBtn.id = 'save';
    let currentBook;
    if (id){
        currentBook = recieveBookFromStorage(id);
        inputForName.value = currentBook.name;
        inputForAuthor.value = currentBook.author;
        inputForImage.value = currentBook.image;
        inputForPlot.value = currentBook.plot;

    }
    form.addEventListener('submit', function(e){

        if (!validURL(window['image'].value)){
            console.log(this.ValidityState.valid);
            window['image'].setCustomValidity('The url for image is not correct');
            return;
        }
        let editBook = {name:inputForName.value,
            author:inputForAuthor.value,
            image:inputForImage.value,
            plot:inputForPlot.value}
        if (id){

            loadBookToStorage(editBook,id);
            renderPreviewSection(id);
        } else{
            loadBookToStorage(editBook);
            renderPreviewSection(localStorage.length-1);
            id = localStorage.length-1;
        }

        setTimeout(function(){
            alert('Book succesfully updated');
        }, 300);

        root.firstChild.replaceChild(createList(), root.firstChild.firstChild);
        let state ={
            page: `/index.html?id=${id}#preview`
        }
        history.pushState(state, '', state.page);


    })
    cancelBtn.addEventListener('click',function(event){
        event.preventDefault();
        if (confirm('Discard changes?')){
            if (id){
                inputForName.value = currentBook.name;
                inputForAuthor.value = currentBook.author;
                inputForImage.value = currentBook.image;
                inputForPlot.value = currentBook.plot;
            }

            window.history.back();
        } else{
            return;
        }
    })
    form.appendChild(labelForName);
    form.appendChild(inputForName);
    form.appendChild(labelForAuthor);
    form.appendChild(inputForAuthor);
    form.appendChild(labelForImage);
    form.appendChild(inputForImage);
    form.appendChild(labelForPlot);
    form.appendChild(inputForPlot);
    form.appendChild(saveBtn);
    form.appendChild(cancelBtn);
    root.appendChild(form);
}
function renderPreviewSection(id){
    if (root.childNodes.length >1){
        root.removeChild(root.childNodes[root.childNodes.length-1]);
    }
    const currentBook = recieveBookFromStorage(id);

    const previewSection = document.createElement('div');
    previewSection.id = 'preview';
    const bookName = document.createElement('h2');
    const img = document.createElement('img');
    const author = document.createElement('p')
    const plot = document.createElement('p');
    bookName.innerHTML = currentBook.name;
    img.src = currentBook.image;
    img.alt = 'Image of book';
    author.innerHTML = currentBook.author;
    plot.innerHTML = currentBook.plot;
    previewSection.appendChild(bookName);
    previewSection.appendChild(img);
    previewSection.appendChild(author);
    previewSection.appendChild(plot);
    root.append(previewSection);

}

let ol = document.querySelector('ol');
function updatestate(state){
    let currentLocation = new URL(window.location.href)
    if (!state){

        if (root.childNodes.length >1){
            root.removeChild(root.childNodes[root.childNodes.length-1]);
        }
        return
    }
    if (currentLocation.hash === '#preview') {
        renderPreviewSection(currentLocation.searchParams.get('id'));
    } else if (currentLocation.hash === '#edit'){
        createForm(currentLocation.searchParams.get('id'));
    } else if (currentLocation.hash === '#add'){
        createForm();
    }
}
window.addEventListener('popstate', function(e){
    updatestate(e.state);
})

ol.addEventListener('click',function(e){
    let state;
    if (e.target.tagName !== 'A') {
        return;
    }
    state ={
        page: e.target.getAttribute('href')
    }
    history.pushState(state, '', state.page)
    updatestate(state);
    console.log();
    e.preventDefault();
})
window.addEventListener('load',updatestate);
window.addEventListener('hashchange',updatestate);
