const id = window.location.search.replace("?id=", "");

fetch(`http://localhost:3000/posts/${id}`)
  .then((response) => response.json())
  .then((post) => {
    postContent.innerHTML = post.content;
  });
