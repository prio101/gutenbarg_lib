import './style.css'

import FetchAllBooks from './gutendex/fetchAllBooks';
import SearchBook from './gutendex/searchBook';
import FilterBooks from './gutendex/filterBooks';
import FetchBook from './gutendex/fetchBook';

const appElement = document.querySelector('#app');
const searchInput = document.querySelector('#search');
const filterSection = document.querySelector('#filter');


const fetchAllBooks = new FetchAllBooks();
const searchBook = new SearchBook();
const filterBooks = new FilterBooks();


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

      <a id="wishlist" class="wish-list">WishList</a>
      <a id="show" class="show-book">Show Book</a>
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

            <a id="wishlist" class="wish-list">WishList</a>
            <a id="show" class="show-book">Show Book</a>
          </div>
        `).join('');
        if (data.results.length === 0) {
          appElement.innerHTML = '<p>No results found.</p>';
        }
      });
    }
  }, 1000); // Delay of 1000ms after the user stops typing
});


filterSection.innerHTML = `
  <h2>Filter by Topic</h2>
  <select id="topic-filter">
    <option value="">Select a topic</option>
    <option value="science">Science</option>
    <option value="history">History</option>
    <option value="fiction">Fiction</option>
    <option value="biography">Biography</option>
  </select>
`;

const topicFilter = document.querySelector('#topic-filter');

topicFilter.addEventListener('change', async () => {
  const selectedTopic = topicFilter.value;

  appElement.innerHTML = '<p>Loading...</p>';

  if (selectedTopic) {
    await filterBooks.fetchBooksByTopic(selectedTopic).then(data => {
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

          <a id="wishlist" class="wish-list">WishList</a>
          <a id="show" class="show-book">Show Book</a>
        </div>
      `).join('');
      if (data.results.length === 0) {
        appElement.innerHTML = '<p>No results found.</p>';
      }
    });
  }
});


// wishlist and save to local storage as wishlisted array
const wishList = document.querySelectorAll('#wishlist');
const wishListArray = JSON.parse(localStorage.getItem('wishList')) || [];

wishList.forEach((wishListItem, index) => {
  wishListItem.addEventListener('click', () => {
    const bookId = booksResult[index].id;
    const bookTitle = booksResult[index].title;

    if (wishListArray.includes(bookId)) {
      alert(`${bookTitle} is already in your wish list.`);
    } else {
      wishListArray.push(bookId);
      localStorage.setItem('wishList', JSON.stringify(wishListArray));
      alert(`${bookTitle} has been added to your wish list.`);
    }
  });
});


// show book details
const bookDetails = document.querySelectorAll('#show');

bookDetails.forEach((bookDetail, index) => {
  bookDetail.addEventListener('click', async () => {
    const bookId = booksResult[index].id;
    const fetchBook = new FetchBook();
    const book = await fetchBook.fetchBookById(bookId);

    if (book) {
      appElement.innerHTML = `
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
      `;
    }
  });
});


// pagination
const pagination = document.querySelector('#pagination');

pagination.innerHTML = `
  <button id="prev-page">Previous</button>
  <span id="current-page">1</span> / ${Math.ceil(booksResult.length / 5)}
  <button id="next-page">Next</button>
`;

const totalPages = Math.ceil(booksResult.length / 5);





pagination.innerHTML = `
  <button id="prev-page">Previous</button>
  <span id="current-page">1</span> / ${totalPages}
  <button id="next-page">Next</button>
`;
const currentPage = document.querySelector('#current-page');
const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');
let currentPageNumber = 1;
const updatePage = (page) => {
  const start = (page - 1) * 5;
  const end = start + 5;
  appElement.innerHTML = booksResult.slice(start, end).map(book => `
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

      <a id="wishlist" class="wish-list">WishList</a>
      <a id="show" class="show-book">Show Book</a>
    </div>
  `).join('');
  currentPage.textContent = page;
};
prevPageButton.addEventListener('click', () => {
  if (currentPageNumber > 1) {
    currentPageNumber--;
    updatePage(currentPageNumber);
  }
});
nextPageButton.addEventListener('click', () => {
  if (currentPageNumber < totalPages) {
    currentPageNumber++;
    updatePage(currentPageNumber);
  }
});
updatePage(currentPageNumber);
// End of main.js
