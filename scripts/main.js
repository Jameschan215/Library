/* -------- Logic here -------- */
const ICONS = {
	read: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-check"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>`,
	unRead: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>`,
	delete: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
};

let myLibrary = [];
let nextId = 1;

function Book({ author, title, pages, genre, read = false }) {
	console.log(read);

	this.id = nextId++;
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.genre = genre;
	this.read = read;
}

Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

function addBookToLibrary(bookData) {
	const { read } = bookData;
	myLibrary.push(new Book({ ...bookData, read: read === 'true' }));
}

// Initial books
const initialBooks = [
	{
		title: 'Poor Economics',
		author: 'Abhijit Banerjee',
		genre: 'Economics',
		pages: 324,
		read: 'false',
	},
	{
		title: 'Sapiens: A Brief History of Humankind',
		author: 'Yuval Noah Harari',
		genre: 'History',
		pages: 580,
		read: 'false',
	},
	{
		title: 'Oracle Bones: A Journey Through Time in China',
		author: 'Peter Hessler',
		genre: 'Cultural',
		pages: 512,
		read: 'true',
	},
	{
		title: "Sophie's World",
		author: 'Jostein Gaarder',
		genre: 'Philosophy',
		pages: 548,
		read: 'true',
	},
];
initialBooks.forEach(addBookToLibrary);

const showBtnDom = document.querySelector('#showDialogBtn');
const dialogDom = document.querySelector('#formDialog');
const cancelBtnDom = document.querySelector('#cancelDialogBtn');
const formDom = document.querySelector('#bookForm');
const bookshelfDom = document.querySelector('#bookshelf');

function updateShelfDisplay() {
	bookshelfDom.innerHTML = myLibrary
		.map(
			(book) => `
				<div class="book" data-id="${book.id}">
					<h4 class="bookTitle">${book.title}</h4>
					<p class="bookAuthor">${book.author}</p>
					<p class="bookGenre">${book.genre}</p>
					<p class="bookPages">${book.pages} pages</p>

					<div>
						<button class="deleteBtn">${ICONS.delete}</button>
						<button class="${book.read ? 'read' : 'unRead'}">
							${book.read ? ICONS.read : ICONS.unRead}
						</button>
					</div>
				</div>
		`
		)
		.join('');

	// document.querySelectorAll('.book button').forEach((btn) => {
	// 	btn.addEventListener('click', (event) => {
	// 		const bookDom = event.target.closest('.book');
	// 		if (!bookDom) return;

	// 		const bookId = +bookDom.dataset.id;
	// 		const currentBook = myLibrary.find((book) => book.id === bookId);

	// 		if (event.target.closest('.deleteBtn')) {
	// 			// Delete book
	// 			myLibrary = myLibrary.filter((book) => book.id !== bookId);
	// 			updateShelfDisplay();
	// 		} else if (event.target.closest('.read, .unRead')) {
	// 			// Toggle read status
	// 			currentBook.toggleRead();
	// 			updateShelfDisplay();
	// 		}
	// 	});
	// });
}

// Dialog buttons
showBtnDom.addEventListener('click', () => dialogDom.showModal());
cancelBtnDom.addEventListener('click', () => dialogDom.close());

// Form submission
formDom.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	addBookToLibrary(Object.fromEntries(formData.entries()));

	updateShelfDisplay();
	formDom.reset();
	dialogDom.close();
});

// Handle book actions (delete, toggle read)
bookshelfDom.addEventListener('click', (event) => {
	const bookDom = event.target.closest('.book');
	if (!bookDom) return;

	const bookId = +bookDom.dataset.id;
	const book = myLibrary.find((b) => b.id === bookId);

	if (event.target.closest('.deleteBtn')) {
		// Delete book
		myLibrary = myLibrary.filter((book) => book.id !== bookId);
		updateShelfDisplay();
	} else if (event.target.closest('.read, .unRead')) {
		// Toggle read status
		book.toggleRead();
		updateShelfDisplay();
	}
});

document.querySelectorAll('.deleteBtn').forEach((btn) => {
	btn.addEventListener('click', (event) => {
		console.log('click delete');

		const bookDom = event.target.closest('.book');
		if (!bookDom) return;

		const bookId = +bookDom.dataset.id;
		myLibrary = myLibrary.filter((book) => book.id !== bookId);
		updateShelfDisplay();
	});
});

// Initial display
updateShelfDisplay();
