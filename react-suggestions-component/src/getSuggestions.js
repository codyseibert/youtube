const items = [
  {
    name: "apples",
  },
  {
    name: "oranges",
  },
  {
    name: "grapes",
  },
  {
    name: "pears",
  },
  {
    name: "bananas",
  },
  {
    name: "blackberrys",
  },
  {
    name: "blueberrys",
  },
  {
    name: "eggplant",
  },
];

export const getSuggestions = async (searchTerm, limit = 5) => {
  return items
    .filter((item) => item.name.indexOf(searchTerm) !== -1)
    .slice(0, limit);
};
