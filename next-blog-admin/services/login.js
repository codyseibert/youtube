import axios from "axios";

export const login = ({ password }) => {
  return axios({
    url: "/api/login",
    baseURL: process.env.API_URL,
    method: "POST",
    data: {
      password,
    },
  }).then((response) => response.data);
};
