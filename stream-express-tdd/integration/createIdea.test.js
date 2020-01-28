const axios = require('axios');

const BASE_URL = `http://localhost:5000`;
describe('POST@/ideas', () => {
  it('should create and return an idea with a status of 200', async () => {
    const DESCRIPTION =
      'Make a live stream of doing TDD and Express';
    const response = await axios.post(`${BASE_URL}/ideas`, {
      description: DESCRIPTION
    });
    const idea = response.data;
    expect(response.status).toEqual(200);
    expect(idea).toMatchObject({
      description: DESCRIPTION
    });
    expect(idea.id).toBeDefined();
  });
});
