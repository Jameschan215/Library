/* -------- Logic here -------- */

const readIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-check"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>`;
const notReadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>`;
const delIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
const myLibrary = [
	{
		title: 'Poor Economics',
		author: 'Abhijit Banerjee',
		genre: 'Economics',
		pages: 324,
		read: false,
	},
	{
		title: 'Sapiens: A Brief History of Humankind',
		author: 'Yuval Noah Harari',
		genre: 'History',
		pages: 580,
		read: false,
	},
	{
		title: 'Oracle Bones: A Journey Through Time in China',
		author: 'Peter Hessler',
		genre: 'Cultural',
		pages: 512,
		read: true,
	},
	{
		title: "Sophie's World",
		author: 'Jostein Gaarder',
		genre: 'Philosophy',
		pages: 548,
		read: true,
	},
];

function Book(author, title, pages, genre, read = false) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.genre = genre;
	this.read = read;
}

function addBookToLibrary({ author, title, pages, genre, read }) {
	const isRead = read === 'true' ? true : false;
	const newBook = new Book(author, title, +pages, genre, isRead);
	myLibrary.push(newBook);
}

const showBtnDom = document.querySelector('#showDialogBtn');
const dialogDom = document.querySelector('#formDialog');
const cancelBtnDom = document.querySelector('#cancelDialogBtn');
const formDom = document.querySelector('#bookForm');
const bookshelfDom = document.querySelector('#bookshelf');

showBtnDom.addEventListener('click', () => {
	dialogDom.showModal();
});

cancelBtnDom.addEventListener('click', () => {
	dialogDom.close();
});

formDom.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const data = Object.fromEntries(formData.entries());
	addBookToLibrary(data);
	updateShelfDisplay();

	formDom.reset();
	dialogDom.close();
});

function updateShelfDisplay() {
	bookshelfDom.innerHTML = '';

	myLibrary.forEach((book) => {
		const bookDom = document.createElement('div');
		const titleDom = document.createElement('h4');
		const authorDom = document.createElement('p');
		const genreDom = document.createElement('p');
		const pagesDom = document.createElement('p');
		const readDom = document.createElement('button');
		const delDom = document.createElement('button');
		const btnContainer = document.createElement('div');

		titleDom.textContent = book.title;
		authorDom.textContent = book.author;
		genreDom.textContent = book.genre;
		pagesDom.textContent = book.pages;
		readDom.innerHTML = book.read ? readIcon : notReadIcon;
		delDom.innerHTML = delIcon;

		bookDom.className = 'book';
		titleDom.className = 'bookTitle';
		authorDom.className = 'bookAuthor';
		genreDom.className = 'bookGenre';
		pagesDom.className = 'bookPages';

		btnContainer.className = 'btnContainer';
		readDom.className = book.read ? 'read' : 'notRead';
		delDom.className = 'deleteBookBtn';

		bookDom.appendChild(titleDom);
		bookDom.appendChild(authorDom);
		bookDom.appendChild(genreDom);
		bookDom.appendChild(pagesDom);

		btnContainer.appendChild(delDom);
		btnContainer.appendChild(readDom);
		bookDom.appendChild(btnContainer);

		bookshelfDom.appendChild(bookDom);

		readDom.addEventListener('click', () => {
			book.read = !book.read;
			readDom.innerHTML = book.read ? readIcon : notReadIcon;
			readDom.className = book.read ? 'read' : 'notRead';
		});
	});
}

updateShelfDisplay();
