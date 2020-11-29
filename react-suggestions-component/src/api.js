const fruits = [
  "apples",
  "oranges",
  "grapes",
  "bananas",
  "cherry",
  "blackberry",
  "rasberry",
];

export const getSuggestions = async (searchText) => {
  return fruits.filter((fruit) => fruit.indexOf(searchText) !== -1);
};
