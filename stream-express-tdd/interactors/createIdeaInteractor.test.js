const {
  createIdeaInteractor
} = require('./createIdeaInteractor');

describe('createIdeaInteractor', () => {
  it('should return an idea that was passed in', () => {
    const idea = await createIdeaInteractor({
      
    })

    expect(idea).toEqual('something')
  });
});
