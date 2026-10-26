document.addEventListener("DOMContentLoaded", () => {
  // Tahun footer otomatis
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Scroll halus untuk tautan navigasi yang menuju bagian halaman
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Tombol kembali ke atas muncul setelah halaman digulir
  const backTop = document.getElementById("backTop");
  const updateBackTop = () => {
    if (backTop) backTop.classList.toggle("show", window.scrollY > 350);
  };

  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Menandai tautan navigasi sesuai bagian yang terlihat
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: "-25% 0px -60% 0px" });

    sections.forEach((section) => observer.observe(section));
  }

  console.log("Portfolio navy berhasil dimuat.");
});
