const { exec } = require('child_process');
const fs = require('fs');

describe('cli using output to stdout', () => {
  beforeEach(() => {
    const file = fs.readFileSync(
      './integration/fixtures/test.txt',
      'utf8'
    );
    fs.writeFileSync(
      './integration/fixtures/test-copy.txt',
      file,
      'utf8'
    );
  });

  afterEach(() => {
    fs.unlinkSync('./integration/fixtures/test-copy.txt');
  });

  it('should return the regex replaced file to stdout', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test-copy.txt "hello/goodbye/g" -i',
      (error, stdout, stderr) => {
        const file = fs.readFileSync(
          './integration/fixtures/test-copy.txt',
          'utf8'
        );
        expect(file).toEqual('goodbye world');
        done();
      }
    );
  });
});
