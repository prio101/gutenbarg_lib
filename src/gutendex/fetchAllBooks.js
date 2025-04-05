export default class FetchAllBooks {
  constructor() {
    this.baseUrl = 'https://gutendex.com/books/';
    this.books = [];
  }

  async fetchBooks(page = 1) {
    const response = await fetch(`${this.baseUrl}?page=${page}`);
    const data = await response.json();
    this.books.push(...data.results);
    console.log(`Fetched page ${page}: ${data.results.length} books`);
    return data;
  }

  async getAllBooks() {
    console.log('Fetching books...');
    await this.fetchBooks();
    return this.books;
  }
}
