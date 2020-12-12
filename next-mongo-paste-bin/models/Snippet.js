import mongoose from "mongoose";

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  snippet: String,
  slug: String,
});

export const Snippet =
  mongoose.models.Snippet ||
  mongoose.model("Snippet", snippetSchema);
