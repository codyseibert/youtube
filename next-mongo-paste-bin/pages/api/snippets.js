import { connect } from "../../util/db";
import { Snippet } from "../../models/Snippet";
const randomstring = require("randomstring");

export default async (req, res) => {
  const db = await connect();

  if (req.method === "POST") {
    const slug = randomstring.generate({
      length: 6,
      charset: "alphabetic",
    });
    const snippet = await Snippet.create({
      ...req.body,
      slug,
    });
    res.statusCode = 200;
    res.json(snippet);
  } else {
    throw new Error("route undefined");
  }
};
