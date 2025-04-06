export const bookDetailsPartial = (bookDetails) => {
  return (
    `
      <div class="book-details">
        <h2>${bookDetails.title}</h2>
        <div class="image-container">
          <img src="${bookDetails.formats['image/jpeg']}" alt="${bookDetails.title}" />
        </div>
        <div class="author-container">
          <p>Authors: ${bookDetails.authors.map(author => author.name).join(', ')}</p>
        </div>
        <div class="description">
          <p>${bookDetails.description || 'No description available.'}</p>
        </div>

      </div>
    `
  )
}
