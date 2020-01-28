exports.stripMongoDB = obj => {
  obj.id = obj._id.toString();
  delete obj._id;
  return obj;
};
