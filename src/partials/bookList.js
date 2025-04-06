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

      <a id="wishlist" class="wish-list" data-bookid=${book.id}>WishList</a>
      <a id="show" class="show-book" data-bookid=${book.id}>Show Book</a>
    </div>
  `
  ).join('');

}
