import FetchBook from './gutendex/fetchBook';

const fetchBook = new FetchBook();

// wishlist page
const wishListPage = document.querySelector('#wish-list-container');

wishListPage.innerHTML = `
  <h2>Wish List</h2>
  <table id="wish-list-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Authors</th>
        <th>Image</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
`;

const wishListTableBody = document.querySelector('#wish-list-table tbody');
const wishListBooks = JSON.parse(localStorage.getItem('wishList')) || [];

if (wishListBooks.length > 0) {
  const fetchAndRenderBooks = async () => {
    for (const bookId of wishListBooks) {
      const book = await fetchBook.fetchBookById(bookId);
      if (book) {
        const row = `
          <tr>
            <td>${book.title}</td>
            <td>${book.authors.map(author => author.name).join(', ')}</td>
            <td><img src="${book.formats['image/jpeg']}" alt="${book.title}" style="width: 50px; height: auto;" /></td>
          </tr>
        `;
        wishListTableBody.innerHTML += row;
      } else {
        const row = `
          <tr>
            <td colspan="4">Book with ID ${bookId} not found.</td>
          </tr>
        `;
        wishListTableBody.innerHTML += row;
      }
    }
  };

  fetchAndRenderBooks();
} else {
  wishListTableBody.innerHTML = '<tr><td colspan="4">Your wish list is empty.</td></tr>';
}
