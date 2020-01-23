import axios from 'axios';

const getBasePath = () => {
  return 'http://localhost:5000';
};

export const getIdeas = async () => {
  const { data: ideas } = await axios.get(`${getBasePath()}/ideas`);
  return ideas;
};

export const createIdea = async idea => {
  const { data: newIdea } = await axios.post(`${getBasePath()}/ideas`, idea);
  return newIdea;
};

export const upVoteIdea = async ideaId => {
  const { data: updatedIdea } = await axios.post(
    `${getBasePath()}/ideas/${ideaId}/votes`
  );
  return updatedIdea;
};

export const downVoteIdea = async ideaId => {
  const { data: updatedIdea } = await axios.delete(
    `${getBasePath()}/ideas/${ideaId}/votes`
  );
  return updatedIdea;
};
