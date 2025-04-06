export const paginationPartial = (booksResult) => {
  return `
    <button id="prev-page">Previous</button>
      <span id="current-page">1</span> / ${Math.ceil(booksResult.length / 5)}
    <button id="next-page">Next</button>
  `;
}
