const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: String,
});

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
