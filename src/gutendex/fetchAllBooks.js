export default class FetchAllBooks {
  constructor() {
    this.baseUrl = 'https://gutendex.com/books';
    this.books = [];
  }

  async fetchBooks() {
    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    this.books.push(...data.results);
    console.log(`Fetched ${data.results.length} books`);
    return data;
  }

  async getAllBooks() {
    console.log('Fetching books...');
    await this.fetchBooks();
    return this.books;
  }
}
