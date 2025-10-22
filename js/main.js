var inputName = document.querySelector("#exampleFormControlInput1");
var inputURL = document.querySelector("#exampleFormControlInput2");
var tBody = document.querySelector("tbody");
var submitBtn = document.querySelector("#Submit");
var modalBody = document.querySelector(".modal-body");
var xMark = document.querySelector(".modal-body span");


var bookList = [];
if(localStorage.getItem("Book List")){
    bookList = JSON.parse(localStorage.getItem("Book List"));
    displayBooks();
}


submitBtn.addEventListener('click',function(){
    console.log(inputName.classList.contains("is-invalid"),inputURL.classList.contains("is-invalid"));
    console.log(inputName.value==='',inputURL==='');
    
    if(inputName.classList.contains("is-invalid")||inputURL.classList.contains("is-invalid")||inputName.value===''||inputURL.value===''){
    modalBody.classList.add("d-block");
    modalBody.classList.remove("d-none");
    }else{
    modalBody.classList.add("d-none");
    modalBody.classList.remove("d-block");
    addBook();
}
})
xMark.addEventListener('click',function(){
    modalBody.classList.add("d-none");
})



function addBook(){
    var book = {
        name : inputName.value,
        bookURL : inputURL.value,
    }
    bookList.push(book);
    localStorage.setItem("Book List",JSON.stringify(bookList));
    addLastBook(book);
    clearInputs();
}
function displayBooks(){
    var container = ``;
    for(var i =0 ; i<bookList.length ; i++){
        container += `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${bookList[i].name}</td>
                        <td><a href="${bookList[i].bookURL}" target="_blank"><button class="btn btn-visit px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
                        <td><button class="btn btn-danger" onclick='deleteBook (${i})'><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
                    </tr>`
    }
    tBody.innerHTML = container;
}


function addLastBook(book){
    var container=` <tr>
                        <th scope="row">${bookList.length}</th>
                        <td>${book.name}</td>
                        <td><a href="${book.bookURL}" target="_blank"><button class="btn btn-visit px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
                        <td><button class="btn btn-danger" onclick='deleteBook (${bookList.length-1})'><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
                    </tr>`;
        tBody.innerHTML +=container;
}

function clearInputs(){
    inputName.value = null;
    inputURL.value = null;
    inputName.classList.remove("is-invalid");
    inputName.classList.remove("is-valid");
    inputURL.classList.remove("is-invalid");
    inputURL.classList.remove("is-valid");
}

function deleteBook (index){
    bookList.splice(index,1);
    localStorage.setItem("Book List",JSON.stringify(bookList));
    displayBooks();
}

function validation (Regex,Field){
    var pattern = new RegExp(Regex,"gi");
    if(pattern.test(Field.value)){
        Field.classList.remove("is-invalid");
        Field.classList.add("is-valid");
    }else{
        Field.classList.remove("is-valid");
        Field.classList.add("is-invalid");
    }
}

inputName.addEventListener('input',function(){
    validation("^[a-zA-Z0-9'_][a-zA-Z0-9\s]{1,}[a-zA-Z'_0-9]$",inputName);
})
inputURL.addEventListener('input',function(){
    validation(    "^(https?:\\/\\/)?" + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + "((\\d{1,3}\\.){3}\\d{1,3}))" +"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + "(\\?[;&a-z\\d%_.~+=-]*)?" +"(\\#[-a-z\\d_]*)?$",inputURL);
})


