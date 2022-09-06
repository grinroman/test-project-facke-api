import PostService from '../js/PostService.js';

const postService = new PostService();

const postsData = await postService.getAllPosts();

let currentPage = 1;
let rows = 10;
let currentDataDublicate;
async function displayPostsList(rowPerPage, page = 0, incomingArr) {
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
    console.log(paginatedData);
    // const paginatedData = incomingArr
    //     ? incomingArr
    //     : postsData.slice(start, end);
    currentDataDublicate = postsData.slice(start, end);
    postsWrapper.innerHTML = '';
    paginatedData.forEach((el) => {
        const headerWrapper = document.createElement('li');

        headerWrapper.classList.add('post');

        const textOfEl = document.createElement('li');
        textOfEl.innerText = el.title;
        textOfEl.classList.add('post__header');
        headerWrapper.appendChild(textOfEl);

        const deleteButton = document.createElement('div');
        deleteButton.innerText = `✖`;
        deleteButton.classList.add('delete__button');
        headerWrapper.appendChild(deleteButton);

        postsWrapper.appendChild(headerWrapper);
    });
}
displayPostsList(rows, currentPage);
function displayPagination(rowPerPage) {
    let pagesCount = Math.ceil(postsData.length / rowPerPage);

    const paginationEl = document.querySelector('.pagination__wrapper');

    for (let i = 0; i < pagesCount; i++) {
        const currentLi = document.createElement('li');
        currentLi.classList.add('pagination__item');
        currentLi.innerText = +(i + 1);
        paginationEl.appendChild(currentLi);

        currentLi.addEventListener('click', (e) => {
            const postsWrapper = document.querySelector(
                '.posts__list__wrapper'
            );
            postsWrapper.innerHTML = '';
            currentPage = i + 1;
            displayPostsList(rows, currentPage);
        });
    }
}

displayPagination(rows);

function displayPaginationButton() {}

const form = document.querySelector('.form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pattern = search.value;
    currentDataDublicate = currentDataDublicate.filter(
        (el) => el.title.toLowerCase().indexOf(pattern.toLowerCase()) >= 0
    );
    console.log(currentDataDublicate);
    displayPostsList(rows, currentPage, currentDataDublicate);
});

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const pattern = search.value;
//     const paginatedData = postsData.filter(
//         (el) => el.title.indexOf(pattern) >= 0
//     );

//     console.log(paginatedData);
//     console.log(pattern);

//     displayPostsList(paginatedData, 0, 0);
// });

// function displayPaginationButton() {}
