export default class SearchBook {
  constructor() {
    this.baseUrl = 'https://gutendex.com/books/';
    this.books = [];
  }

  async fetchBooksByTitle(title) {
    const response = await fetch(`${this.baseUrl}?search=${title}`);
    const data = await response.json();
    this.books.push(...data.results);
    console.log(`Fetched books by title "${title}": ${data.results.length} books`);
    return data;
  }
}
