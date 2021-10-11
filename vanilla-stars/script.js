const stars = document.querySelectorAll(".stars a");

stars.forEach((star, idx) => {
  star.addEventListener("click", () => {
    console.log(`star ${idx} was clicked`);
  });
});
