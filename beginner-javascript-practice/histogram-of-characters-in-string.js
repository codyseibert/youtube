// 1. declare a string to run the count logic over
const theString = 'the dog jumped over the lazy moon';

// 2. create an object to keep track of all the counts
const characterCounts = {};

// 3. loop over each character of the string
for (const character of theString) {
  // 4. increment the character count in the object we initialized
  if (characterCounts[character] === undefined) {
    characterCounts[character] = 0;
  }
  characterCounts[character]++;
}

// 5. print out the count object
console.log(characterCounts);
