import './style.css'

import FetchAllBooks from './gutendex/fetchAllBooks';
import SearchBook from './gutendex/searchBook';


const appElement = document.querySelector('#app');
const searchInput = document.querySelector('#search');


const fetchAllBooks = new FetchAllBooks();
const searchBook = new SearchBook()

// user defined settings
let searchTimeout;

let booksResult = await fetchAllBooks.getAllBooks();
if (booksResult.length > 0) {
  appElement.innerHTML = booksResult.map(book => `
    <h2 id="total-book-result"></h2>
    <div class="card">
      <h2>${book.title}</h2>

      <div class="image-container">
        <img src="${book.formats['image/jpeg']}" alt="${book.title}" />
      </div>
      <div class="author-container">
        <p>Authors: ${book.authors.map(author => author.name).join(', ')}</p>
      </div>

      <div class="id">
        <p>ID: ${book.id}</p>
      </div>

      <a>WishList</a>
    </div>
  `).join('');
} else {
  appElement.innerHTML = '<p>Loading...</p>';
}

searchInput.innerHTML = `
  <input type="text"
         id="search-input"
         placeholder="Search by title..."
         class="search-bar" />
`;


const searchInputField = document.querySelector('#search-input');
searchInputField.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    console.log('Input event triggered', searchInputField.value);
    const searchTerm = searchInputField.value;
    if (searchTerm) {
      await searchBook.fetchBooksByTitle(searchTerm).then(data => {
        appElement.innerHTML = data.results.map(book => `
          <div class="card">

            <h2>${book.title}</h2>

            <div class="image-container">
              <img src="${book.formats['image/jpeg']}" alt="${book.title}" />
            </div>
            <div class="author-container">
              <p>Authors: ${book.authors.map(author => author.name).join(', ')}</p>
            </div>

            <div class="id">
              <p>ID: ${book.id}</p>
            </div>

            <a>WishList</a>
          </div>
        `).join('');
        if (data.results.length === 0) {
          appElement.innerHTML = '<p>No results found.</p>';
        }
      });
    }
  }, 1000); // Delay of 1000ms after the user stops typing
});
