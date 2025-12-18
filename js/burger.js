const hamburger = document.getElementById("hamburger");
const spNav = document.getElementById("spNav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  spNav.classList.toggle("active");
});
