const { exec } = require('child_process');

describe('cli using output to stdout', () => {
  it('should return the regex replaced file to stdout', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test.txt "hello/goodbye/g"',
      (error, stdout, stderr) => {
        expect(stdout).toEqual('goodbye world\n');
        done();
      }
    );
  });
});
