import { connect } from "./db";

export const methodMapper = (methods) => async (req, res) => {
  const { method } = req;
  if (!methods[method]) {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } else {
    await connect();
    await methods[method](req, res);
  }
};
