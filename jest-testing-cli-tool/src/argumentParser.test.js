const { argumentParser } = require('./argumentParser');

describe('argumentParser', () => {
  it('should return the expected arguments', () => {
    const output = argumentParser({
      args: ['test.txt', 'hello/good bye/g'],
    });
    expect(output).toEqual({
      slashDelimitedString: 'hello/good bye/g',
      isReplaceExisting: false,
      inputFilePath: 'test.txt',
    });
  });

  it('should return isReplaceExisting as true when -i option passed in', () => {
    const output = argumentParser({
      args: ['test.txt', 'hello/good bye/g', '-i'],
    });
    expect(output).toEqual({
      slashDelimitedString: 'hello/good bye/g',
      isReplaceExisting: true,
      inputFilePath: 'test.txt',
    });
  });
});
