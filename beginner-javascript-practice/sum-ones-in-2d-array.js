const numbers = [
  [0, 1, 1],
  [1, 0, 0],
  [0, 0, 1]
];

let sum = 0;

for (
  let rowIndex = 0;
  rowIndex < numbers.length;
  rowIndex++
) {
  const row = numbers[rowIndex];
  for (
    let colIndex = 0;
    colIndex < row.length;
    colIndex++
  ) {
    const number = row[colIndex];
    if (number === 1) {
      sum++;
    }
  }
}

console.log(sum);
