const users = JSON.parse(localStorage.getItem("users") || "[]");

interface registerArgs {
  username: string;
  password: string;
}
export const register = ({ username, password }: registerArgs) => {
  const user = users.find((u) => u.username === username);
  if (user) {
    return Promise.reject(new Error("user already exists"));
  }
  users.push({
    username,
    password,
  });
  localStorage.setItem("users", JSON.stringify(users));
  return Promise.resolve(user);
};

interface loginParams {
  username: string;
  password: string;
}

export const login = ({ username, password }: loginParams) => {
  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) {
    return Promise.reject(new Error("invalid login"));
  }
  localStorage.setItem("credentials", JSON.stringify({ username, password }));
  return Promise.resolve("success");
};
