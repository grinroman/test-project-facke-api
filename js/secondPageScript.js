import PostService from './PostService.js';

const postService = new PostService();
let params = new URL(document.location).searchParams;

let requiredPost = await postService.getOptionalPost(params.get('id')); //
requiredPost = requiredPost[0];

const wrapperTitle = document.createElement('p');
const title = document.querySelector('.title');
wrapperTitle.innerText = requiredPost.title;
title.appendChild(wrapperTitle);

const info = document.querySelector('.info');
const wrapperText = document.createElement('p');
wrapperText.innerText = requiredPost.body;
info.appendChild(wrapperText);
