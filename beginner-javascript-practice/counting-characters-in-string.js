// 1. read in the command line arguments to get the character
// and the word
const [, , characterToFind, word] = process.argv;

// 2. declare a dynamic variable to keep track of the count
let count = 0;

// 3. loop over every character of the word
for (const character of word) {
  // 4. if the current character matches the character we are lookign for
  if (characterToFind === character) {
    // 5. increase count
    count++;
  }
}

// 6. print out the count
console.log(
  `we found ${count} '${characterToFind}' inside the word '${word}'.`
);
