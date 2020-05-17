const {
  slashDelimitedRegexReplacer,
} = require('./slashDelimitedRegexReplacer');

describe('slashDelimitedRegexReplacer', () => {
  it('should replace hello world goodbye', () => {
    const output = slashDelimitedRegexReplacer({
      slashDelimitedString: 'hello/goodbye/g',
      text: 'hello world',
    });
    expect(output).toEqual('goodbye world');
  });
});
