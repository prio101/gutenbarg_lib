export default class FilterBooks {
  constructor() {
    this.baseUrl = 'https://gutendex.com/books/';
    this.books = [];
  }

  async fetchBooksByTopic(topic) {
    const response = await fetch(`${this.baseUrl}?topic=${topic}`);
    const data = await response.json();
    this.books.push(...data.results);
    console.log(`Fetched books by topic "${topic}": ${data.results.length} books`);
    return data;
  }
}
