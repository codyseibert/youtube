const stringToCheck =
  'the quick brown fox jumped over the lazy moon';

const vowels = ['a', 'e', 'i', 'o', 'u'];

let newString = '';

for (const char of stringToCheck) {
  if (vowels.indexOf(char) === -1) {
    newString += char;
  }
}

console.log(newString);

// const expected = 'th qck brwn fx jmpd vr th lzy mn';
