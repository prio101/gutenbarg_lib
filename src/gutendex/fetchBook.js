export default class FetchBook {
  constructor() {
    this.baseUrl = 'https://gutendex.com/books/';
    this.book = null;
  }

  async fetchBookById(id) {
    const response = await fetch(`${this.baseUrl}${id}/`);
    if (!response.ok) {
      throw new Error(`Error fetching book with ID ${id}: ${response.statusText}`);
    }
    this.book = await response.json();
    console.log(`Fetched book with ID ${id}`);
    return this.book;
  }
}
