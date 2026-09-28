// ===== Nav: sfond kur bën scroll + menuja në celular =====
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ===== Seksionet shfaqen butë gjatë scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Hapur / Mbyllur (E hënë – E shtunë, 8:00 – 16:30, ora e Kosovës) =====
function updateOpenStatus() {
  const el = document.getElementById("openStatus");
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Belgrade" })
  );
  const day = now.getDay(); // 0 = e diel
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = day !== 0 && minutes >= 8 * 60 && minutes < 16 * 60 + 30;

  el.textContent = isOpen ? "Tani jemi hapur" : "Tani jemi mbyllur · hapemi 8:00";
  el.style.setProperty("--dot", isOpen ? "#9DB88F" : "#CDB597");
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

// ===== Viti në footer =====
document.getElementById("year").textContent = new Date().getFullYear();
