import './style.css'

import FetchAllBooks from './gutendex/fetchAllBooks';
import SearchBook from './gutendex/searchBook';
import FilterBooks from './gutendex/filterBooks';
import FetchBook from './gutendex/fetchBook';

// parials:
import { bookList } from './partials/bookList';
import { searchBar } from './partials/searchBar';
import { topicSelector } from './partials/topicSelector';
import { bookDetailsPartial } from './partials/bookDetailsPartial';


// Initialize the main app
const appElement = document.querySelector('#app');
const searchInput = document.querySelector('#search');
const filterSection = document.querySelector('#filter');


const fetchAllBooks = new FetchAllBooks();
const searchBook = new SearchBook();
const filterBooks = new FilterBooks();
const fetchBook = new FetchBook();


// user defined settings
let searchTimeout;

let booksResult = await fetchAllBooks.getAllBooks();
if (booksResult.length > 0) {
  appElement.innerHTML = bookList(booksResult);
} else {
  appElement.innerHTML = '<p>Loading...</p>';
}

searchInput.innerHTML = searchBar();


const searchInputField = document.querySelector('#search-input');
searchInputField.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    console.log('Input event triggered', searchInputField.value);
    const searchTerm = searchInputField.value;
    if (searchTerm) {
      await searchBook.fetchBooksByTitle(searchTerm).then(data => {
        appElement.innerHTML = bookList(data.results);
        if (data.results.length === 0) {
          appElement.innerHTML = '<p>No results found.</p>';
        }
      });
    }
  }, 1000); // Delay of 1000ms after the user stops typing
});


filterSection.innerHTML = topicSelector();

const topicFilter = document.querySelector('#topic-filter');

topicFilter.addEventListener('change', async () => {
  const selectedTopic = topicFilter.value;

  appElement.innerHTML = '<p>Loading...</p>';

  if (selectedTopic) {
    await filterBooks.fetchBooksByTopic(selectedTopic).then(data => {
      appElement.innerHTML = bookList(data.results);
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
    const bookId = wishListItem.dataset.bookid;

    if (wishListArray.includes(parseInt(bookId))) {
      alert(`Book is already in your wish list.`);
    } else {
      wishListArray.push(bookId);
      localStorage.setItem('wishList', JSON.stringify(wishListArray));
      alert(`Book has been added to your wish list.`);
    }
  });
});


// show book details
const showBookButtons = document.querySelectorAll('#show');

showBookButtons.forEach((showBookButton, index) => {
  showBookButton.addEventListener('click', async () => {
    const bookId = showBookButton.dataset.bookid;
    console.log(`Show book details for ID: ${bookId}`);

    const bookDetails = await fetchBook.fetchBookById(bookId);

    if (bookDetails) {
      appElement.innerHTML = bookDetailsPartial(bookDetails);
    }
    else {
      appElement.innerHTML = '<p>Book not found.</p>';
    }
  console.log(`Book details for ID ${bookId}:`, bookDetails);
  });
});

// pagination
const pagination = document.querySelector('#pagination');

pagination.innerHTML = `
  <button id="prev-page">Previous</button>
  <span id="current-page">1</span> / ${Math.ceil(booksResult.length / 5)}
  <button id="next-page">Next</button>
`;


const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');

let currentPage = 1;

const itemsPerPage = 5;
const totalPages = Math.ceil(booksResult.length / itemsPerPage);

const renderPage = (page) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  appElement.innerHTML = bookList(booksResult.slice(startIndex, endIndex));

  // Re-attach event listeners for wishlist buttons
  const wishList = document.querySelectorAll('#wishlist');
  wishList.forEach((wishListItem) => {
    wishListItem.addEventListener('click', () => {
      const bookId = wishListItem.dataset.bookid;

      if (wishListArray.includes(parseInt(bookId))) {
        alert(`Book is already in your wish list.`);
      } else {
        wishListArray.push(bookId);
        localStorage.setItem('wishList', JSON.stringify(wishListArray));
        alert(`Book has been added to your wish list.`);
      }
    });
  });

  // Re-attach event listeners for show book buttons
  const showBookButtons = document.querySelectorAll('#show');
  showBookButtons.forEach((showBookButton) => {
    showBookButton.addEventListener('click', async () => {
      const bookId = showBookButton.dataset.bookid;
      console.log(`Show book details for ID: ${bookId}`);

      const bookDetails = await fetchBook.fetchBookById(bookId);

      if (bookDetails) {
        appElement.innerHTML = bookDetailsPartial(bookDetails);
      } else {
        appElement.innerHTML = '<p>Book not found.</p>';
      }
      console.log(`Book details for ID ${bookId}:`, bookDetails);
    });
  });
};
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    document.querySelector('#current-page').textContent = currentPage;
  }
});
nextPageButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
    document.querySelector('#current-page').textContent = currentPage;
  }
});
