// Minimal JS for single-page version

// --- Sidebar toggle (for contacts info) ---
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebar = document.querySelector("[data-sidebar]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("expanded");
    sidebarBtn.querySelector("span").textContent =
      sidebar.classList.contains("expanded") ? "Hide Contacts" : "Show Contacts";
  });
}

// --- Smooth scroll for anchor links (optional, if you add # links) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
