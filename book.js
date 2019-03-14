// set up the library
let myLibrary = [];
// the book constructor
class book{
    constructor(title,author,pages,status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}
// add book to the library
const addBookToList = () =>{
    const title = document.getElementById('title').value ;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;
    const Book = new book(title, author, pages, status);
    myLibrary.push(Book);
}
//set the books to the store
const Store =() =>{
    if(typeof(Storage) !== "undefined"){
        window.localStorage.setItem('books', JSON.stringify(myLibrary));
    }
    else { console.log("your browser does not support local storage");}
}
//display the book library
const render = () => {
    while(document.querySelector('#library').childNodes[0]){
        let child = document.querySelector('#library').childNodes[0];
        document.querySelector('#library').removeChild(child);
    }
    const table = document.getElementById('library');
    const rowtitle = document.createElement('tr');
    rowtitle.innerHTML = `
                  <th>Title</th>
                  <th>Author</th>
                  <th>Pages</th>
                  <th>Status</th>
                  <th>Delete</th> `;
    table.appendChild(rowtitle);          
    for (let index of myLibrary){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${index.title}</td>
        <td>${index.author}</td>
        <td>${index.pages}</td>
        <td><button class="changeStatus" data-number="${myLibrary.indexOf(index)}">${index.status}</button></td>
        <td class="delete" data-number="${myLibrary.indexOf(index)}">Delete</td> `;
        table.appendChild(row);
    }
    let className = document.getElementsByClassName('changeStatus');
    Array.from(className).forEach((element) =>{
        element.addEventListener('click',changeStatus);
    });
    let classDelete = document.getElementsByClassName('delete');
    Array.from(classDelete).forEach((ele) => {
        ele.addEventListener('click',deleteBook);
    });
    Store();
}
// button to change status
function changeStatus(e){
    e.preventDefault;
    let index = e.target.dataset.number;
    let status = myLibrary[index].status;
    if (status == "Read") { status = "Unread";}
    else{ status = "Read";}
    myLibrary[index].status = status;
    render(); 
       
}
// function to delete a book from a library
function deleteBook(e){
    let index = e.target.dataset.number;
    myLibrary.splice(index,1);
    render();
    
}
//set the library from store
if (JSON.parse(window.localStorage.getItem('books'))){
    myLibrary = JSON.parse(window.localStorage.getItem('books'));
    render();
}
//add eventListener to the elements
document.getElementById('book-form').addEventListener("submit",(e) =>
{
    addBookToList();
    e.preventDefault();
    e.target.reset();    
    render();
    
});

