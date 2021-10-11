const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: data,
  });
  const post = await response.json();
  window.location.href = `./post.html?id=${post._id}`;
});
