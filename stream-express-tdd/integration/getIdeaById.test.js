const axios = require('axios');
const { BASE_URL } = require('./config');

const { getDatabaseConnection } = require('../db');

const { createIdea } = require('../persistence/createIdea');

let createdIdea = null;

describe('GET@/ideas/:id', () => {
  beforeEach(async () => {
    const db = await getDatabaseConnection();
    createdIdea = await createIdea({
      db,
      idea: {
        description: 'abc'
      }
    });
  });

  it('should return the idea with the specified id', async () => {
    const response = await axios.get(
      `${BASE_URL}/ideas/${createdIdea.id}`
    );
    const idea = response.data;
    expect(response.status).toEqual(200);
    expect(idea).toEqual({
      id: createdIdea.id,
      description: 'abc'
    });
  });
});
