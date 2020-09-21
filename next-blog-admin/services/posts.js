import axios from "axios";

const getHeaders = (password) => {
  return {
    headers: {
      Authorization: `Basic ${btoa(`:${password}`)}`,
    },
  };
};

export const searchPosts = ({ titleText }) => {
  return axios({
    url: `/api/posts/search?title=${titleText}`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const createPost = ({ post, password }) => {
  return axios({
    url: "/api/posts",
    baseURL: process.env.API_URL,
    method: "POST",
    ...getHeaders(password),
    data: post,
  }).then((response) => response.data);
};

export const getTotalPages = () => {
  return axios({
    url: "/api/posts/count",
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const getPosts = (page = 0) => {
  return axios({
    url: `/api/posts?page=${page}`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const removePost = ({ id, password }) => {
  return axios({
    url: `/api/posts/${id}`,
    baseURL: process.env.API_URL,
    ...getHeaders(password),
    method: "DELETE",
  }).then((response) => response.data);
};

export const getPost = (id) => {
  return axios({
    url: `/api/posts/${id}`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const getRecentPosts = () => {
  return axios({
    url: `/api/posts/recent`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const getPopularPosts = () => {
  return axios({
    url: `/api/posts/popular`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const updatePost = ({ id, post, password }) => {
  return axios({
    url: `/api/posts/${id}`,
    baseURL: process.env.API_URL,
    method: "POST",
    ...getHeaders(password),
    data: post,
  }).then((response) => response.data);
};
