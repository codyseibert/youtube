const { getIdeaById } = require('./getIdeaById');

describe('getIdeaById', () => {
  it('should try to fetch the idea from mongodb', async () => {
    const IDEA = {
      description: 'hello world'
    };
    const result = await getIdeaById({
      db: {
        collection: () => ({
          findOne: () => ({
            _id: 'abc',
            ...IDEA
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
