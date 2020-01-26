const axios = require('axios');

describe('POST@/ideas', () => {
  it('should create and return an idea with a status of 200', async () => {
    // TODO: don't hard code localhost and 5000
    const DESCRIPTION =
      'Make a live stream of doing TDD and Express';
    const result = await axios.post(
      'http://localhost:5000/ideas',
      {
        description: DESCRIPTION
      }
    );
    expect(result.status).toEqual(200);
    expect(result.data).toMatchObject({
      description: DESCRIPTION
    });
  });
});
