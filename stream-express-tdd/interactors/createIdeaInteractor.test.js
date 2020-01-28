const {
  createIdeaInteractor
} = require('./createIdeaInteractor');

describe('createIdeaInteractor', () => {
  it('should return an idea that was passed in', async () => {
    const idea = await createIdeaInteractor({
      idea: {
        description: 'testing'
      },
      createIdea: () => ({
        description: 'testing',
        id: '123'
      })
    });

    expect(idea).toEqual({
      description: 'testing',
      id: '123'
    });
  });
});
