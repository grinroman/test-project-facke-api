import PostService from './PostService.js';
// import displayPagination from '../js/displayPagination.js';
// import displayPostsList from '../js/displayPostsList.js';
const postService = new PostService();

let postsData = await postService.getAllPosts();

let currentPage = 1;
let rows = 10;
let currentDataDublicate;
let filteringByAllRecords = false;

displayPostsList(null, rows, currentPage);
displayPagination(rows);

const body = document.getElementsByTagName('body')[0];
const searchForm = document.querySelector('.form');
const search = document.querySelector('.header__search');
const addForm = document.querySelector('.add__record__form');
const openPopup = document.getElementsByClassName('popup__button')[0];
const crossButtonPopup = document.getElementsByClassName(
    'popup__close__button'
)[0];
const theWholePopup = document.getElementsByClassName('popup')[0];
const checkBox = document.getElementById('checkbox');

body.style.cssText = 'overflow-y:hidden;';

checkBox.addEventListener('click', (e) => {
    if (e.target.checked) {
        filteringByAllRecords = true;
    } else {
        filteringByAllRecords = false;
    }
});

crossButtonPopup.addEventListener('click', (e) => {
    e.preventDefault();
    theWholePopup.classList.remove('popup__hide');
});
openPopup.addEventListener('click', (e) => {
    e.preventDefault();
    theWholePopup.classList.add('popup__hide');
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInfo = {
        userId: Math.trunc(postsData.length / rows),
        id: postsData.length,
        title: e.target.header.value,
        body: e.target.info.value,
    };

    if (postService.addResource(userInfo)) {
        postsData = [userInfo, ...postsData];
    }
    displayPostsList(null, rows, currentPage);
    if (postsData.length % 10 === 1) displayPagination(rows);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pattern = search.value;
    if (!filteringByAllRecords) {
        currentDataDublicate = currentDataDublicate.filter(
            (el) => el.title.toLowerCase().indexOf(pattern.toLowerCase()) >= 0
        );
        body.style.cssText = 'overflow-y:hidden;';
    } else {
        currentDataDublicate = postsData.filter(
            (el) => el.title.toLowerCase().indexOf(pattern.toLowerCase()) >= 0
        );
        body.style.cssText = 'overflow-y:inherit;';
    }
    displayPostsList(currentDataDublicate, rows, currentPage);
});

async function displayPostsList(incomingArr, rowPerPage, page = 0) {
    const postsWrapper = document.querySelector('.posts__list__wrapper');
    --page;
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    let paginatedData;
    if (incomingArr) {
        paginatedData = incomingArr;
    } else {
        paginatedData = postsData.slice(start, end);
    }
    currentDataDublicate = postsData.slice(start, end);
    postsWrapper.innerHTML = '';
    paginatedData.forEach((el) => {
        const headerWrapper = document.createElement('li');

        headerWrapper.classList.add('post');

        const textOfEl = document.createElement('li');
        textOfEl.classList.add('post__header');

        const innerOfEl = document.createElement('a');
        innerOfEl.innerText = el.title;
        innerOfEl.href = `item.html?id=${el.id}`;

        textOfEl.appendChild(innerOfEl);
        headerWrapper.appendChild(textOfEl);

        textOfEl.addEventListener('onClick', (e) => {});

        const deleteButton = document.createElement('div');
        deleteButton.innerText = `✖`;
        deleteButton.classList.add('delete__button');
        headerWrapper.appendChild(deleteButton);
        const currentId = el.id;

        deleteButton.addEventListener('click', (e) => {
            body.style.cssText = 'overflow-y:inherit;';
            console.log(currentId);
            console.log(paginatedData);
            deleteButton.parentElement.remove();
            if (postService.deleteOnePost(el.id)) {
                paginatedData = paginatedData.filter(
                    (el) => el.id !== currentId
                );
                postsData = postsData.filter((el) => el.id !== currentId);
                paginatedData = [...paginatedData, postsData[end + 1]];
                displayPostsList(paginatedData, rows, currentPage);
            }
        });

        postsWrapper.appendChild(headerWrapper);
    });
}
function displayPagination(rowPerPage) {
    let pagesCount = Math.ceil(postsData.length / rowPerPage);

    const paginationEl = document.querySelector('.pagination__wrapper');

    for (let i = 0; i < pagesCount; i++) {
        const currentLi = document.createElement('li');
        currentLi.classList.add('pagination__item');
        currentLi.innerText = +(i + 1);
        paginationEl.appendChild(currentLi);

        currentLi.addEventListener('click', (e) => {
            body.style.cssText = 'overflow-y:inherit;';
            const postsWrapper = document.querySelector(
                '.posts__list__wrapper'
            );
            postsWrapper.innerHTML = '';
            currentPage = i + 1;
            displayPostsList(null, rows, currentPage);
        });
    }
}
