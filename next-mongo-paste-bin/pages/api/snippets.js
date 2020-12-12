import { connect } from "../../utils/db";
import { Snippet } from "../../models/Snippet";
import * as randomstring from "randomstring";

export default async (req, res) => {
  await connect();

  if (req.method === "POST") {
    const slug = randomstring.generate({
      length: 6,
      charset: "alphabetic",
    });
    const snippet = await Snippet.create({
      snippet: req.body.snippet,
      slug,
    });

    res.statusCode = 200;
    res.json(snippet);
  } else {
    throw new Error(
      "http method not supported on this endpoint"
    );
  }
};
