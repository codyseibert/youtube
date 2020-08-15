import axios from "axios";

interface registerArgs {
  username: string;
  password: string;
}
export const register = ({ username, password }: registerArgs) => {
  return axios.post("http://localhost:4000/register", {
    username,
    password,
  });
};

interface loginParams {
  username: string;
  password: string;
}

export const login = ({ username, password }: loginParams) => {
  return axios.post("http://localhost:4000/login", {
    username,
    password,
  });
};
