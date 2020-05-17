const {
  outputProcessorFactory,
} = require('./outputProcessorFactory');

jest.spyOn(console, 'log');

describe('outputProcessorFactory', () => {
  it('should log the output when isReplaceExisting is false', async () => {
    console.log.mockImplementation(() => null);
    await outputProcessorFactory({
      isReplaceExisting: false,
    })({
      outputText: 'hello',
    });
    expect(console.log.mock.calls[0][0]).toEqual('hello');
  });
});
