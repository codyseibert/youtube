const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    post(id: Int!): Post
    posts: [Post]
    createPost(title: String): Post
  }

  type Post {
    id: Int
    title: String
    comments: [Comment]
  }

  type Comment {
    text: String
    user: String
  }
`);

let NEXT_ID = 4;

class Post {
  constructor(post) {
    Object.assign(this, post);
    this.comments = this.comments || [];
    this.id = this.id || NEXT_ID++;
  }

  async comments() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            text: 'what is up',
            user: 'bob'
          }
        ]);
      }, 1000);
    });
  }
}

const posts = [
  {
    id: 1,
    title: 'this video is AWESOME'
  }
];

const root = {
  post: ({ id }) => {
    return new Post(posts.find(post => post.id === id));
  },
  posts: () => {
    return posts.map(post => new Post(post));
  },
  createPost: ({ title }) => {
    const post = new Post({ title });
    posts.push(post);
    return post;
  }
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
