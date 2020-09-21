import axios from "axios";

export const getCategories = () => {
  return axios({
    url: `/api/categories`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const getCategoryCounts = () => {
  return axios({
    url: `/api/categories/counts`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};

export const getPostsInCategory = (id) => {
  return axios({
    url: `/api/categories/${id}/posts`,
    baseURL: process.env.API_URL,
    method: "GET",
  }).then((response) => response.data);
};
