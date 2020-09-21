const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "Other",
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
