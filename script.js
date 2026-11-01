const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const label = document.querySelector(".theme-label");
const stored = localStorage.getItem("elena-theme");

document.body.classList.add("js-ready");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  toggle.setAttribute(
    "aria-label",
    isLight ? "Ganti ke mode gelap" : "Ganti ke mode terang"
  );
  label.textContent = isLight ? "Mode gelap" : "Mode terang";
  localStorage.setItem("elena-theme", theme);
}

applyTheme(stored || "dark");

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
  if (el.getBoundingClientRect().top < window.innerHeight - 40) {
    el.classList.add("is-visible");
  }
});
