
add (a, b) {
  return a + b;
}

@inject 'fs'
main ({ fs }) {
  x = add(1, 2);
  const file = fs.readFileSync('./test.txt', 'utf-8');
  print(x);
}