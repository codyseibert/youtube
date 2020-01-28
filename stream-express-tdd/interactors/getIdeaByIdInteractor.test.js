const {
  getIdeaByIdInteractor
} = require('./getIdeaByIdInteractor');

describe('getIdeaByIdInteractor', () => {
  it('should return an idea that was passed in', async () => {
    const IDEA_ID = '123';
    const idea = await getIdeaByIdInteractor({
      ideaId: IDEA_ID,
      getIdeaById: ({ ideaId }) => ({
        description: 'testing',
        id: IDEA_ID
      })
    });

    expect(idea).toEqual({
      description: 'testing',
      id: IDEA_ID
    });
  });
});
