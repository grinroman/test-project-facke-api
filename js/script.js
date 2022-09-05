import PostService from '../js/PostService.js';

const postService = new PostService();

const postsData = await postService.getAllPosts();

let currentPage = 1;
let rows = 10;

async function displayPostsList(rowPerPage, page) {
    const postsWrapper = document.querySelector('.posts__list__wrapper');
    --page;
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = postsData.slice(start, end);

    paginatedData.forEach((el) => {
        const postEl = document.createElement('li');
        postEl.classList.add('post');

        const headerEl = document.createElement('div');
        headerEl.classList.add('post__header');
        headerEl.innerText = el.title;
        postEl.appendChild(headerEl);

        const infoEl = document.createElement('div');
        infoEl.classList.add('post__info');
        infoEl.innerText = el.body;
        postEl.appendChild(infoEl);

        postsWrapper.appendChild(postEl);
    });
}
displayPostsList(rows, currentPage);

function displayPagination(rowPerPage) {
    let pagesCount = Math.ceil(postsData.length / rowPerPage);

    const paginationEl = document.querySelector('.pagination__wrapper');

    for (let i = 0; i < pagesCount; i++) {
        const currentLi = document.createElement('li');
        currentLi.classList.add('pagination__item');
        currentLi.innerText = +i;
        paginationEl.appendChild(currentLi);

        currentLi.addEventListener('click', (e) => {
            displayList(rows, i);
        });
    }
}

displayPagination(rows);

function displayPaginationButton() {}
