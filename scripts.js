import { authors } from "./data.js";
import { genres } from "./data.js";
import { books } from "./data.js";
let matches = books
let page = 1;

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}
//Home button 
const homeButton = document.querySelector('[class="header__text"]');
homeButton.addEventListener('click',()=>{
document.querySelector("[data-list-items]").style.display = "block";
document.querySelector("[data-list-items]").style.display = "grid";
document.querySelector("[data-list-message]").style.display = "none";
document.querySelector('[data-list-button]').disabled = false
document.querySelector('[data-list-button]').innerHTML =  `Show more (${books.length - 36})`
})


//Search button
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})
// Search specific books
const searchFilter = document.querySelector('[data-search-form]')
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();
   document.querySelector('[data-list-items]').style.display = 'none'
   document.querySelector('[data-list-message]').innerHTML = ''

    const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author');

const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  if (genre1 === 'any' && author1 === 'any') {
   if (book.title.toLowerCase().includes(title1.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  if (genre1 === 'any') {
    if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1){
     filteredBooks.push(book);
    }
   }
   if (title1 === '') {
    if (book.author === author1 && book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   if (title1 === '' && author1 === 'any' ) {
    if (book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   if (filteredBooks.length > 0){
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
   
}
document.querySelector('[class="list__message"]').style.display = 'block'
document.querySelector('[data-list-button]').innerHTML =  `Show more (${filteredBooks.length})`

const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment2.appendChild(preview)
        }
    const booklist2 = document.querySelector('[class="list__message"]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector("[data-search-overlay]").style.display = "none";
    })

//Settings Button
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})
//Theme To Light and Dark Mode
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector('[form="settings"]')
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )

// Search Button
const authorFragment = document.createDocumentFragment();
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
document.querySelector('[data-search-authors]').appendChild(authorFragment);

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
document.querySelector('[data-search-genres]').appendChild(genresFragment);

//////////////////////////////////////////////////////////

// Grid

let startIndex = 0;
let endIndex = 36;
const fragment1 = document.createDocumentFragment()
const extracted1 = books.slice(startIndex, endIndex)
    for (const {author ,image, title, id , description, published} of extracted1) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment1.appendChild(preview)
        }
const booklist1 = document.querySelector('[data-list-items]')
booklist1.appendChild(fragment1)

// Show more button
const showMoreButton = document.querySelector('[data-list-button]')
let numOfBooks = books.length -36
showMoreButton.innerHTML =  `Show more (${numOfBooks})`
if(showMoreButton.innerHTML === `Show more (${-12})`){
showMoreButton.innerHTML =  `Show more (${0})` 
showMoreButton.disabled = true
}
showMoreButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    numOfBooks -= 36;
    let numOfBooks1 = numOfBooks
    showMoreButton.innerHTML =  `Show more (${numOfBooks1})`

    const startIndex1 = startIndex
    const endIndex1 = endIndex
    const extracted = books.slice(startIndex1, endIndex1)

for (const {author ,image, title, id , description, published} of extracted) {
     const preview = document.createElement('button')
     preview.className = 'preview'
     preview.dataset.id = id
     preview.dataset.title = title
     preview.dataset.image = image
     preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
     preview.dataset.description = description
     // preview.dataset.genre = genres
     preview.innerHTML= /*html*/`
     <div class="child" >
     <image class='preview__image' src="${image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${title}<dt>
     <dt class='preview__author'> By ${authors[author]}</dt>
     </div>`
     fragment.appendChild(preview)
     }
 const booklist1 = document.querySelector('[data-list-items]')
 booklist1.appendChild(fragment)
})


// when click on each book display details

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
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)

const bookclickInSearch = document.querySelector('[data-list-message]')
bookclickInSearch.addEventListener('click', detailsToggle)