import basicAuth from "express-basic-auth";

export const verifyIsAdmin = (req, res) => {
  return new Promise((resolve) => {
    basicAuth({
      users: { "": process.env.ADMIN_PASSWORD },
    })(req, res, resolve);
  });
};
