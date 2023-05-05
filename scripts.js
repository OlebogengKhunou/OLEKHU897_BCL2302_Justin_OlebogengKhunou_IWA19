import { authors } from "./data.js";
import { genres } from "./data.js";
import { books } from "./data.js";

// settings for day and night mode colors
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
}

const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}

/* 
  A fragment of each book to be appended to datalistItems
  in html and display upon running or entry to page
 */
const dataListItems = document.querySelector("[data-list-items]")
const dataSearchOverlay = document.querySelector("[data-search-overlay]")

let startIndex = 0;
let endIndex = 36;
const fragment1 = document.createDocumentFragment()
const extracted1 = books.slice(startIndex, endIndex)
for (const { author, image, title, id, description, published } of extracted1) {
  const preview = document.createElement('button')
  preview.className = 'preview'
  preview.dataset.id = id
  preview.dataset.title = title
  preview.dataset.image = image
  preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
  preview.dataset.description = description
  preview.innerHTML = /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
  fragment1.appendChild(preview)
}
dataListItems.appendChild(fragment1)

/*
   showMoreButton along with an addlistener to perform action 
  of appending more book fragments when it is clicked  to the 
  dataListItems div and decrease the number of books not showen yet.
*/
const showMoreButton = document.querySelector('[data-list-button]')
let numOfBooks = books.length - 36
showMoreButton.innerHTML = `Show more (${numOfBooks})`

showMoreButton.addEventListener('click', () => {
  const fragment = document.createDocumentFragment()
  startIndex += 36;
  endIndex += 36;
  numOfBooks -= 36;

  showMoreButton.innerHTML = `Show more (${numOfBooks})`

  const extracted = books.slice(startIndex, endIndex)
  for (const { author, image, title, id, description, published } of extracted) {
    const preview = document.createElement('button')
    preview.className = 'preview'
    preview.dataset.id = id
    preview.dataset.title = title
    preview.dataset.image = image
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
    preview.dataset.description = description
    preview.innerHTML = /*html*/`
     <div class="child" >
     <image class='preview__image' src="${image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${title}<dt>
     <dt class='preview__author'> By ${authors[author]}</dt>
     </div>`
    fragment.appendChild(preview)
  }
  dataListItems.appendChild(fragment)
})

/* 
  dataSerchForm along with an addlistener to get data from form
  loop through books object and compared data if true return / append
  book object to dataListItems
 */
const dataSearchForm = document.querySelector('[data-search-form]')
const dataListMessage = document.querySelector("[data-list-message]")
const dataListButton = document.querySelector('[data-list-button]')

dataSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  dataListItems.innerHTML = ''

  const formData = new FormData(event.target)
  const title1 = formData.get('title');
  const genre1 = formData.get('genre');
  const author1 = formData.get('author');

  const filteredBooks = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    if (genre1 === 'any' && author1 === 'any') {
      if (book.title.toLowerCase().includes(title1.toLowerCase())) {
        filteredBooks.push(book);
      }
    }
    if (genre1 === 'any') {
      if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1) {
        filteredBooks.push(book);
      }
    }
    if (title1 === '') {
      if (book.author === author1 && book.genres.includes(genre1)) {
        filteredBooks.push(book);
      }
    }
    if (title1 === '' && author1 === 'any') {
      if (book.genres.includes(genre1)) {
        filteredBooks.push(book);
      }
    }
    if (filteredBooks.length > 0) {
      dataListItems.style.display = 'block'
      dataListMessage.style.display = "none";
      dataListButton.disabled = true
    } else {
      dataListMessage.style.display = "block";
      dataListItems.style.display = 'none'
      dataListButton.disabled = true
    }
  }
  dataListButton.innerHTML = `Show more (${filteredBooks.length})`

  const fragment2 = document.createDocumentFragment()
  for (const { author, image, title, id, description, published } of filteredBooks) {
    const preview = document.createElement('button')
    preview.className = 'preview'
    preview.dataset.id = id
    preview.dataset.title = title
    preview.dataset.image = image
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
    preview.dataset.description = description
    preview.innerHTML = /*html*/`
   <div>
   <image class='preview__image' src="${image}" alt="book pic"}/>
   </div>
   <div class='preview__info'>
   <dt class='preview__title'>${title}<dt>
   <dt class='preview__author'> By ${authors[author]}</dt>
   </div>`
    fragment2.appendChild(preview)
  }
  dataListItems.append(fragment2)
  dataListItems.style.display = "grid";
  dataSearchForm.reset()
  dataSearchOverlay.style.display = "none";
})

//////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
   Function to display an overlay of each book's details
   when each book object is clicked, then close overlay
   by addlistener when close buttin is clicked.
*/
const detailsClose = document.querySelector('[data-list-close]')
const dataListActive = document.querySelector("[data-list-active]")

const detailsToggle = (event) => {
  const overlay1 = document.querySelector('[data-list-active]');
  const title = document.querySelector('[data-list-title]')
  const subtitle = document.querySelector('[data-list-subtitle]')
  const description = document.querySelector('[data-list-description]')
  const image1 = document.querySelector('[data-list-image]')
  const imageblur = document.querySelector('[data-list-blur]')

  event.target.dataset.id ? overlay1.style.display = "block" : undefined;
  event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
  event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
  event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
  event.target.dataset.image ? image1.setAttribute('src', event.target.dataset.image) : undefined;
  event.target.dataset.image ? imageblur.setAttribute('src', event.target.dataset.image) : undefined;
};

detailsClose.addEventListener('click', (event) => {
  dataListActive.style.display = "none";
})
dataListItems.addEventListener('click', detailsToggle)

//////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
   searchbutton and searchCancel along with addlistener 
   to when each is clicked to close and open searchOverlay
*/
const searchbutton = document.querySelector("[data-header-search]");
const searchCancel = document.querySelector("[data-search-cancel]");

searchbutton.addEventListener('click', (event) => {
  dataSearchOverlay.style.display = "block";
})
searchCancel.addEventListener('click', (event) => {
  dataSearchOverlay.style.display = "none";
})

/*
  Loop through authors and genres objects get all items 
  append as list of options to select inputs in searchForm
*/
const authorFragment = document.createDocumentFragment();
const dataSearchAuthors = document.querySelector('[data-search-authors]')
const dataSearchGenres = document.querySelector('[data-search-genres]')

let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorFragment.appendChild(element);
for (let [id, name] of Object.entries(authors)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  authorFragment.appendChild(element);
}
dataSearchAuthors.appendChild(authorFragment);

const genresFragment = document.createDocumentFragment();
let element2 = document.createElement('option');
element2.value = 'any';
element2.innerText = 'All Genres';
genresFragment.appendChild(element2);
for (let [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  genresFragment.appendChild(element);
}
dataSearchGenres.appendChild(genresFragment);

/*
   settingsbutton and settingCancel along with addlistener 
   to when each is clicked to close and open settingsOverlay
*/


//Settings Button to open and close the settings overlay
const settingbutton = document.querySelector("[data-header-settings]")
const settingCancel = document.querySelector('[data-settings-cancel]')
const dataSettingsOverlay = document.querySelector("[data-settings-overlay]")

settingbutton.addEventListener('click', (event) => {
  dataSettingsOverlay.style.display = "block";
})
settingCancel.addEventListener('click', (event) => {
  dataSettingsOverlay.style.display = "none";
})

/*
  formSettings along with an addlistener to get data from form
  compared data if true body setProperty book object to Light
  and Dark Mode themes then close dataSettingsOverlay
*/
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const formSettings = document.querySelector('[form="settings"]')
const bodyOverlay = document.querySelector('body')

formSettings.addEventListener('click', (event) => {
  event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    bodyOverlay.style.setProperty('--color-dark', day.dark)
    bodyOverlay.style.setProperty('--color-light', day.light)
    dataSettingsOverlay.style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    bodyOverlay.style.setProperty('--color-dark', night.dark)
    bodyOverlay.style.setProperty('--color-light', night.light)
    dataSettingsOverlay.style.display = "none";
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////////