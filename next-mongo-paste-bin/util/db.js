const mongoose = require("mongoose");

let isConnected = false;

export const connect = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect("mongodb://localhost/paste-bin", {
    useNewUrlParser: true,
  });
  isConnected = true;
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log(err);
  });
};
