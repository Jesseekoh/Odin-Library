import './style.css';

let myLibrary = [];

// DOM elements
const bookShelf = document.querySelector('.book-shelf');
const modalOverlay = document.querySelector('.modal-overlay');
const modalToggle = document.querySelector('.add-btn');
const form = document.querySelector('form');
const addNewBookBtn = document.querySelector('.add-new-book-btn');

function Book(title, author, pageCount, hasRead) {
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
	this.hasRead = hasRead;
	this.toggleReadStatus = function () {
		if (this.hasRead === 'on') {
			this.hasRead = 'off';
		} else {
			this.hasRead = 'on';
		}
	};
}

// Book.prototype.editBook = function () {
// 	console.log('I want to edit this book');
// };

function addBookToLibrary(title, author, pageCount, hasRead) {
	let book = new Book(title, author, pageCount, hasRead);
	myLibrary.push(book);
}

function displayBooks() {
	if (myLibrary.length === 0) {
		bookShelf.className = 'book-shelf grid gap-2 pb-2';
		bookShelf.classList.add('place-items-center');
		bookShelf.innerHTML = `
			<h2>Book list is empty. Add new book</h2>
		`;
	} else {
		bookShelf.className =
			'book-shelf grid md:grid-cols-2 lg:grid-cols-4 gap-2 pb-2';
		bookShelf.classList.remove('place-items-center');
		myLibrary.map((book, index) => {
			let bookCard = document.createElement('div');
			bookCard.className = 'card bg-mint-5 rounded-lg shadow-md md:col-6 p-4';
			bookCard.innerHTML = `
				<h2 class="font-bold text-xl">${book.title}</h2>
				<h3 class="font-bold">${book.author}</h3>
				<h3>${book.pageCount} Pages</h3>
				<h3>${book.hasRead === 'on' ? 'completed' : 'Not yet completed'}</h3>
				<div class="card-operations ms-auto">
					<button class="btn btn-info edit-btn" data-book-id="${index}">
						<i class='bx bxs-edit-alt'></i>
					</button>
					<button class="btn delete-btn btn-danger" data-book-id="${index}">
						<i class='bx bxs-trash'></i>
					</button>
				</div>
			`;
			bookShelf.appendChild(bookCard);
		});
		let editbtns = document.querySelectorAll('.edit-btn');
		let deleteBtns = document.querySelectorAll('.delete-btn');
		editbtns.forEach((element) => {
			element.onclick = (e) => {
				console.log(myLibrary[element.dataset.bookId]);
				myLibrary[element.dataset.bookId].toggleReadStatus();
				bookShelf.innerHTML = '';
				displayBooks();
			};
		});
		deleteBtns.forEach((element) => {
			element.onclick = (e) => {
				bookShelf.innerHTML = '';
				deleteBook(element.dataset.bookId);
			};
			// deleteBook(element.dataset.bookId);
		});
	}
}

displayBooks();

function displayForm() {
	modalToggle.classList.toggle('rotate');
	modalOverlay.classList.toggle('hidden');
	modalOverlay.classList.toggle('fade');
	modalOverlay.classList.toggle('grid');
}

modalToggle.onclick = displayForm;

addNewBookBtn.onclick = (e) => {
	e.preventDefault();
	const data = new FormData(form);
	const json = Object.fromEntries(data.entries());
	console.log(json);
	addBookToLibrary(
		json['book-title'],
		json['book-author'],
		json.pages,
		json.complete
	);
	form.reset();
	bookShelf.innerHTML = '';
	displayBooks();

	console.log(myLibrary);
};
function deleteBook(bookIndex) {
	myLibrary = myLibrary.filter((item, index) => index != bookIndex);
	displayBooks();
}
