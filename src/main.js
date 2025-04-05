import './style.css'

import FetchAllBooks from './gutendex/fetchAllBooks';
import SearchBook from './gutendex/searchBook';
const appElement = document.querySelector('#app');
const searchInput = document.querySelector('#search');
const fetchAllBooks = new FetchAllBooks();
const searchBook = new SearchBook()
let booksResult = await fetchAllBooks.getAllBooks();


if (booksResult.length > 0) {
  appElement.innerHTML = booksResult.map(book => `
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
  <button id="search-button">Search</button>
`;


const searchButton = document.querySelector('#search-button');
const searchInputField = document.querySelector('#search-input');
searchButton.addEventListener('click', async () => {
  const searchTerm = searchInputField.value;
  if (searchTerm) {
    const filteredBooks = await searchBook.fetchBooksByTitle(searchTerm).then(data => {
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
});
