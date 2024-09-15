// create empty array to store books objects
let myLibrary = [];

// dialog's related contants
const modal = document.querySelector('#modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');
const addNewBook = document.querySelector('.submit');

// table related contants
const table = document.createElement('table');

// manually add few book's to the array
const knittingWithDogHair = new Book('Knitting With Dog Hair', 'Kendall Crolius, Anne Montgomery', '112');
const gardenGnomeAttack = new Book('How to Survive a Garden Gnome Attack', 'Chuck Sambuchino', '112');
const everyonePoops = new Book('Everyone Poops', 'Taro Gomi', '27');
myLibrary.push(knittingWithDogHair,gardenGnomeAttack, everyonePoops);

// book's object constructor
function Book(title, author, pages, read) {
    if (!read) { read = false };
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// add a metod, that toggles status (read or unread) of a book, to Book's prototype
Book.prototype.changeStatus = function() {
    this.read = !this.read;
    return this.read;
}

// create an object from a user input and push it to the array myLibrary
function addBookToLibrary() {
    let newBook = new Book(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        document.querySelector('#pages').value,
        document.querySelector('#read').checked
    )
    myLibrary.push(newBook);
    document.querySelector('form').reset();
}

//generate a table with books from myLibrary array
function createTable() {
    table.innerHTML = '<thead><th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Delete</th>';
    for ([index, book] of myLibrary.entries()) { 
        const newRow = document.createElement('tr');
        const title = document.createElement('td'); 
        const tdAuthor = document.createElement('td');
        const tdPages = document.createElement('td');
        const tdRead = document.createElement('td'); 
        const tdDeleteBtn = document.createElement('td');
        title.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = book.pages;
        tdRead.append(createStatusCheckbox(book));
        tdDeleteBtn.append(createDeleteButton(index));
        newRow.append(title, tdAuthor, tdPages, tdRead, tdDeleteBtn);
        table.appendChild(newRow);
    }
    document.querySelector('.container').appendChild(table);
}

//create change status checkbox 
function createStatusCheckbox(book) {
    let checkbox = document.createElement('input');
    checkbox.class = 'checkbox';
    checkbox.type = "checkbox";
    checkbox.checked = book.read;
    checkbox.addEventListener('click', () => {
        checkbox.checked = book.changeStatus()
    })
    return checkbox;
}

// create delete buttons for a table
function createDeleteButton(index) {
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('button', 'delete');
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', () => {
        deleteRow(index)
    })
    return deleteBtn;
} 

// deletes row where delete button was clicked
function deleteRow(i) {
    myLibrary.splice(i, 1);
    createTable();
}

// event listeners for buttons
// open dialog
openModal.addEventListener('click', () => {
    modal.showModal();
})

// close dialog
closeModal.addEventListener('click', () => {
    modal.close();
})

//  prevent defald action (triying to send the data to a server), add new book to the array, 
//create new table, close dialog
addNewBook.addEventListener('click', function(event) {
    event.preventDefault();
    addBookToLibrary();
    createTable();
    modal.close();
})


createTable();



