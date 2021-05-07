fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((posts) => {
    previews.innerHTML = `
      <div class="hello-world">
        ${posts.map(Post).join("")}
      </div>`;
  });

const Post = (post) => {
  return `
  <div class="preview">
    <div>
      <h2>${post.title}</h2>
      <p>
        ${post.description}
      </p>
      <a href="./post.html?id=${post._id}">Read More...</a>
    </div>
    <img class="preview-image" src="${post.image}" />
  </div>
`;
};
