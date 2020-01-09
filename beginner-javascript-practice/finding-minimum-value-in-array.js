const numbers = [3, 8, -3, -10, 9, 3];

let min = null;

for (let number of numbers) {
  if (min === null) {
    // we haven't found any number yet
    min = number;
  } else if (number < min) {
    // set the new minimum
    min = number;
  }
}

console.log('your minimum was ' + min);
