export default async (req, res) => {
  if (req.method == "POST") {
    const { body } = req;
    if (body.password === process.env.ADMIN_PASSWORD) {
      res.status(200);
      res.json({ message: "success" });
    } else {
      res.status(401);
      res.json({ message: "invalid password" });
    }
  }
};
