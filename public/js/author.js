document.addEventListener('DOMContentLoaded', async () => {
    const authorName = new URLSearchParams(window.location.search).get('name');
    const authorNameElement = document.getElementById('author-name');
    const authorBooksList = document.querySelector('.author-books-list');

    authorNameElement.textContent = authorName; // Affiche le nom de l'auteur sur la page

    try {
        const response = await fetch(`http://localhost:3003/api/products?author=${encodeURIComponent(authorName)}`);
        const books = await response.json();

        if (books.length > 0) {
            books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <h2>${book.name}</h2>
                    <p>Price: $${book.price}</p>
                    <p>${book.description}</p>
                    <img src="${book.image}" alt="${book.name}" class="product-image" />
                    <a href="sproduct.html?id=${book.id}" class="btn">View Product</a>
                `;
                authorBooksList.appendChild(bookItem);
            });
        } else {
            authorBooksList.innerHTML = '<p>No books found for this author.</p>';
        }
    } catch (error) {
        console.error('Error fetching books by author:', error);
    }
});
