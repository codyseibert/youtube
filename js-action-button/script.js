const actionBtn = document.querySelector(".action-menu__button");
const dropdown = document.querySelector(".action-dropdown");

actionBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("hide");
});

window.addEventListener("click", () => {
  dropdown.classList.add("hide");
});
