exports.get = async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
