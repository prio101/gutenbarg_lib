const wishlistArray = JSON.parse(localStorage.getItem('wishList')) || [];

const isBookInWishlist = (bookId) => {
  const wishlist = wishlistArray;
  return wishlist.includes(bookId);
};
export const bookList = (books) => {
  if (!books || books.length === 0) {
    return '<p>No books found</p>';
  }
  return books.map(book =>
    `
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

      <a id="wishlist" class="wish-list ${isBookInWishlist(parseInt(book.id)) ? 'wishlisted' : ''}"
                       data-bookid=${book.id}>${isBookInWishlist(parseInt(book.id)) ? 'Wishlisted' : 'Wishlist'}</a>
      <a id="show" class="show-book" data-bookid=${book.id}>Show Book</a>
    </div>
  `
  ).join('');

}
