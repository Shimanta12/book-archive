// global variables
const searchField = document.getElementById('search-field');
const errorMessage = document.getElementById('error-message');
const totalResult = document.getElementById('total-results');
const bookContainer = document.getElementById('book-container');

// loadBooks
const loadBooks = () => {
    const searchText = searchField.value;
    // validation
    if (searchText === '') {
        errorMessage.innerHTML = `
        <h3 class="text-danger text-center">Please enter a book name 📙</h3>
        `;
        totalResult.innerHTML = '';
        bookContainer.innerHTML = '';
    }
    else {
        errorMessage.innerHTML = '';
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
    searchField.value = '';
}
// display books
const displayBooks = data => {
    // validation
    if (data.numFound === 0) {
        errorMessage.innerHTML = `
        <h3 class="text-danger text-center">No result found😶</h3>
        `;
        totalResult.innerHTML = '';
        bookContainer.innerHTML = '';
        return;
    }
    else {
        errorMessage.innerHTML = '';

    }
    // clearing previous result
    bookContainer.innerHTML = '';

    // storing data.docs in books
    const books = data.docs;
    totalResult.innerHTML = `
    <h4 class="text-center text-light"><span class="text-info">Total result found:</span> ${data.numFound}</h4>
    <h4 class="text-center text-light"><span class="text-info">Total result shown:</span> ${books.length}</h4>
    `;
    books.forEach(book => {
        const cover = bookCover(book.cover_i);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
            <div class="card rounded-3">
                <img style="height: 300px" src="${cover}" class="card-img-top bg-info p-1" alt="Book Cover">
                <div class="card-body text-center">
                    <h5 class="card-title text-success">Book: ${book.title.slice(0, 30)}</h5>
                    <h6 class="card-title text-success">Author: <span class="text-info">${book.author_name?.[0] || 'Not found'}</span> </h6>
                    <h6 class="card-title text-success">Publisher: <span class="text-info">${book.publisher?.[0] || 'Not found'}</span></h6>
                    <h6 class="card-title text-success">First Published: <span class="text-info">${book.first_publish_year || 'Not found'}</span></h6>     
                </div>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
    });
}
// book cover image
const bookCover = coverCode => {
    const url = `https://covers.openlibrary.org/b/id/${coverCode}-M.jpg`;
    return url;
}