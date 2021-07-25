const navList = document.querySelector(".nav-list");
const hamburger = document.querySelector(".hamburger");
const header = document.querySelector(".header");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
});

const navHeight = header.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    header.classList.add("fix");
  } else {
    header.classList.remove("fix");
  }
});
