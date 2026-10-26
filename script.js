document.addEventListener("DOMContentLoaded", function () {
  // Tahun footer otomatis.
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Scroll halus untuk navigasi internal.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Tombol kembali ke atas.
  const backTop = document.getElementById("backTop");
  function updateBackTop() {
    if (backTop) backTop.classList.toggle("show", window.scrollY > 350);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Menyorot menu sesuai bagian halaman yang sedang terlihat.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActiveLink(sectionId) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + sectionId);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: "-25% 0px -60% 0px" });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  console.log("Portofolio navy berhasil dimuat.");
});
