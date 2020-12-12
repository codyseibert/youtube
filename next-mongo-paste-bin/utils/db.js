import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
  if (!isConnected) {
    await mongoose.connect(
      "mongodb://localhost/paste-bucket",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    isConnected = true;
  }
};
