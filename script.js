/* Brianna Rivera — portfolio interactions
   Kept deliberately small: reveal-on-scroll and a sticky masthead hairline. */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* — Reveal elements as they enter the viewport — */
  const revealables = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* — Lightbox for Selected Work — */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const imgEl = document.getElementById("lb-img");
    const embedEl = document.getElementById("lb-embed");
    const linkEl = document.getElementById("lb-link");
    const titleEl = document.getElementById("lb-title");
    const metaEl = document.getElementById("lb-meta");
    const captionEl = document.getElementById("lb-caption");
    const indexEl = document.getElementById("lb-index");
    const totalEl = document.getElementById("lb-total");
    const countEl = lightbox.querySelector(".lightbox__count");
    const closeEls = lightbox.querySelectorAll("[data-lb-close]");
    const prevBtn = lightbox.querySelector("[data-lb-prev]");
    const nextBtn = lightbox.querySelector("[data-lb-next]");
    const closeBtn = lightbox.querySelector(".lightbox__close");

    let images = [];
    let alts = [];
    let current = 0;
    let lastFocused = null;

    const render = () => {
      const total = images.length;
      imgEl.src = images[current];
      imgEl.alt = alts[current] || "";
      indexEl.textContent = String(current + 1);
      totalEl.textContent = String(total);
      const multi = total > 1;
      prevBtn.hidden = !multi;
      nextBtn.hidden = !multi;
    };

    const openLightbox = (btn) => {
      titleEl.innerHTML = btn.dataset.title || "";
      metaEl.textContent = btn.dataset.meta || "";
      captionEl.innerHTML = btn.dataset.caption || "";

      const embedSrc = btn.dataset.embed;
      if (embedSrc) {
        // Live embed mode (e.g. LinkedIn posts)
        images = [];
        imgEl.hidden = true;
        imgEl.removeAttribute("src");
        embedEl.hidden = false;
        embedEl.src = embedSrc;
        prevBtn.hidden = true;
        nextBtn.hidden = true;
        if (countEl) countEl.hidden = true;
        linkEl.hidden = false;
        linkEl.href = btn.dataset.href || "#";
        lightbox.classList.add("is-embed");
      } else {
        // Image gallery mode
        try {
          images = JSON.parse(btn.dataset.images || "[]");
          alts = JSON.parse(btn.dataset.alts || "[]");
        } catch (e) {
          images = [];
          alts = [];
        }
        if (!images.length) return;
        embedEl.hidden = true;
        embedEl.removeAttribute("src");
        imgEl.hidden = false;
        if (countEl) countEl.hidden = false;
        linkEl.hidden = true;
        lightbox.classList.remove("is-embed");
        current = 0;
        render();
      }

      lastFocused = btn;
      lightbox.hidden = false;
      // force reflow so the transition runs
      void lightbox.offsetWidth;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      const done = () => {
        lightbox.hidden = true;
        imgEl.removeAttribute("src");
        embedEl.removeAttribute("src");
        lightbox.removeEventListener("transitionend", done);
      };
      if (prefersReduced) {
        done();
      } else {
        lightbox.addEventListener("transitionend", done);
      }
      if (lastFocused) lastFocused.focus();
    };

    const step = (dir) => {
      if (images.length < 2) return;
      current = (current + dir + images.length) % images.length;
      render();
    };

    document.querySelectorAll(".project__open").forEach((btn) => {
      btn.addEventListener("click", () => openLightbox(btn));
    });
    closeEls.forEach((el) => el.addEventListener("click", closeLightbox));
    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));

    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab") {
        // simple focus trap across the interactive controls
        const focusable = [closeBtn, prevBtn, nextBtn, linkEl].filter((el) => el && !el.hidden);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* — Hairline under the masthead once the page has scrolled — */
  const masthead = document.querySelector(".masthead");
  if (masthead) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          masthead.classList.toggle("is-stuck", window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
