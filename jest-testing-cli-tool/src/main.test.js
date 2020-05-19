const writeModule = require('./writeFileToDisk');
const readModule = require('./readFileFromDisk');

jest.spyOn(writeModule, 'writeFileToDisk');
jest.spyOn(readModule, 'readFileFromDisk');
jest.spyOn(console, 'log');

readModule.readFileFromDisk.mockImplementation(
  () => 'hello world'
);
writeModule.writeFileToDisk.mockImplementation(() => null);

const { main } = require('./main');

describe('main', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should write to the console when isReplaceExisting is false', async () => {
    await main({
      slashDelimitedString: 'hello/goodbye/g',
      isReplaceExisting: false,
      inputFilePath: './this-is-mocked-out.txt',
    });

    expect(console.log.mock.calls[0][0]).toEqual(
      'goodbye world'
    );
  });

  it('should write to the disk when isReplaceExisting is true', async () => {
    await main({
      slashDelimitedString: 'hello/goodbye/g',
      isReplaceExisting: true,
      inputFilePath: './this-is-mocked-out.txt',
    });

    expect(
      writeModule.writeFileToDisk.mock.calls[0][0]
    ).toEqual({
      data: 'goodbye world',
      path: './this-is-mocked-out.txt',
    });
  });
});
