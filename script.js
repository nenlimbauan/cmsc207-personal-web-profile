document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], footer[id]");

  function setActiveLink(id) {
    navLinks.forEach((link) => link.classList.remove("active"));

    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetId = this.getAttribute("href").replace("#", "");
      setActiveLink(targetId);
    });
  });

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.getAttribute("id");
          }
        });

        if (visibleSection) {
          setActiveLink(visibleSection);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -55% 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const catCards = document.querySelectorAll(".cat-card");

  catCards.forEach((card) => {
    card.addEventListener("click", function () {
      const isOpen = card.classList.contains("active");

      catCards.forEach((c) => c.classList.remove("active"));

      if (!isOpen) {
        card.classList.add("active");
      }
    });
  });

  const revealBtn = document.getElementById("revealCatsBtn");
  const catContent = document.getElementById("catStoryContent");

  if (revealBtn && catContent) {
    revealBtn.addEventListener("click", function () {
      const isHidden =
        catContent.classList.contains("hidden") ||
        window.getComputedStyle(catContent).display === "none";

      if (isHidden) {
        catContent.classList.remove("hidden");
        revealBtn.textContent = "Hide My Cat Story";
      } else {
        catContent.classList.add("hidden");
        revealBtn.textContent = "Reveal My Cat Story";
      }
    });
  }
});