const { readFileFromDisk } = require('./readFileFromDisk');

const fs = require('fs');

jest.spyOn(fs, 'readFile');

describe('readFileFromDisk', () => {
  it('should return the expected file if it exists on disk', async () => {
    fs.readFile.mockImplementation((path, options, cb) =>
      cb(null, 'hello world')
    );

    const file = await readFileFromDisk({
      path: 'test.txt',
    });

    expect(file).toEqual('hello world');
  });

  it('should throw an error if file does not exist', () => {
    fs.readFile.mockImplementation((path, options, cb) =>
      cb(new Error('something bad happened'))
    );

    expect(() =>
      readFileFromDisk({
        path: 'test.txt',
      })
    ).rejects.toThrow('something bad happened');
  });
});
