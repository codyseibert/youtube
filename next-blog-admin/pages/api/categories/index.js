export const CATEGORIES = ["Other", "Javascript", "AWS", "DevOps", "React"];

const getCategories = async (req, res) => {
  res.json(CATEGORIES);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getCategories(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
