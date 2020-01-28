const { createIdea } = require('./createIdea');

describe('createIdea', () => {
  it('should invoke mongodb create method with expected parameters', async () => {
    const IDEA = {
      description: 'hello world'
    };
    const result = await createIdea({
      db: {
        collection: () => ({
          insertOne: () => ({
            ops: [
              {
                _id: 'abc',
                ...IDEA
              }
            ]
          })
        })
      },
      idea: IDEA
    });
    expect(result).toMatchObject({
      id: 'abc',
      ...IDEA
    });
  });
});
