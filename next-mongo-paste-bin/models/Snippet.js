import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  snippet: "string",
  slug: "string",
});

schema.methods.castToObject = function () {
  return {
    ...this.toObject(),
    _id: this._id.toString(),
  };
};

export const Snippet =
  mongoose.models.Snippet ||
  mongoose.model("Snippet", schema);
