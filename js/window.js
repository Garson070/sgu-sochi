(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Меню ---------- */

  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");

  if (burger && menu) {
    var setOpen = function (open) {
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        var first = menu.querySelector("a");
        if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 250);
      }
    };

    menu.querySelectorAll("li").forEach(function (li, i) { li.style.setProperty("--i", i); });
    var here = location.pathname.split("/").pop() || "edinoe-okno.html";
    menu.querySelectorAll("a").forEach(function (a) {
      if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
    });

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /* ---------- Появление при скролле ---------- */

  // Группы, в которых соседние элементы появляются «лесенкой».
  var groups = [
    [".hero ~ main .notice, .notice", "up"],
    [".community h2", "left"],
    [".socials a", "scale", 60],
    [".services .tile", "up", 70],
    [".band > span", "up"],
    [".topic", "up", 60],
    [".doc-card", "up", 90],
    [".pill-wide .pill, .pill-list .pill, .pills-3 .pill, .form-link .pill, .soc .pill, .reward .pill", "up", 70],
    [".terms__head, .terms__row", "up", 60],
    [".lead, .prose > *, .azimut-text p", "up"],
    [".spec__grid h3", "left"],
    [".spec__list .prog, .visit .prog, .pay .prog", "up", 50],
    [".place", "up"],
    [".benefit__rate", "scale"],
    [".benefit__text, .benefit__para", "right", 120],
    [".h-blue", "left"],
    [".room", "up", 120],
    [".azimut > *, .azimut__col > *", "up", 80],
    [".eligible > div", "up", 120],
    [".check-card, .req-card", "up", 50],
    [".flow__step", "up"],
    [".rules > div > h3", "up", 100],
    [".rules li", "up", 40],
    [".pass__item", "up", 100],
    [".info-card", "up", 120],
    [".grant", "up", 120],
    [".gtable__row", "up"],
    [".file", "up", 60],
    [".banner", "up", 90],
    ["[data-leo]", "pop"]
  ];

  var revealTargets = [];
  groups.forEach(function (g) {
    var seen = new Map();
    document.querySelectorAll(g[0]).forEach(function (el) {
      if (el.hasAttribute("data-reveal")) return;
      el.setAttribute("data-reveal", g[1]);
      if (g[2]) {
        var parent = el.parentElement;
        var n = seen.get(parent) || 0;
        seen.set(parent, n + 1);
        el.style.setProperty("--d", Math.min(n, 8) * g[2]);
      }
      revealTargets.push(el);
    });
  });

  if (!("IntersectionObserver" in window) || reduce) {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
    document.querySelectorAll(".leo-float").forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });

    // «Дыхание» маскотов включаем только когда они на экране.
    var floatIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-in", entry.isIntersecting);
      });
    });
    document.querySelectorAll(".leo-float").forEach(function (el) { floatIo.observe(el); });
  }

  /* ---------- Hero: появление и параллакс орла ---------- */

  var eagle = document.querySelector(".hero__eagle");
  var hero = document.querySelector(".hero");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add("is-loaded"); });
  });
  if (eagle) setTimeout(function () { eagle.classList.add("is-idle"); }, 1900);

  /* ---------- Скролл: параллакс, кнопка меню, таймлайн ---------- */

  var flow = document.querySelector(".flow");
  var flowDots = flow ? Array.prototype.slice.call(flow.querySelectorAll(".flow__dot")) : [];
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;

    if (burger && hero) burger.classList.toggle("is-scrolled", y > hero.offsetHeight - 120);

    if (!reduce && eagle && y < (hero ? hero.offsetHeight : 600)) {
      eagle.style.setProperty("--parallax", (y * 0.18).toFixed(1) + "px");
    }

    if (flow) {
      var r = flow.getBoundingClientRect();
      var p = (vh * 0.7 - r.top) / r.height;
      p = Math.max(0, Math.min(1, p));
      flow.style.setProperty("--progress", reduce ? 1 : p.toFixed(3));
      var lineTop = r.top + r.height * p;
      flowDots.forEach(function (dot) {
        dot.classList.toggle("is-on", reduce || dot.getBoundingClientRect().top < Math.max(lineTop, r.top + 150));
      });
    }
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Счётчик (СТАВКА 3%) ---------- */

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var to = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce || !("IntersectionObserver" in window)) return;
    el.textContent = "0" + suffix;
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      var start = performance.now();
      var dur = 1100;
      (function tick(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(to * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      })(start);
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  /* ---------- Карусель ---------- */

  document.querySelectorAll("[data-carousel]").forEach(function (box) {
    var track = box.querySelector(".carousel__track");
    var prev = box.querySelector(".carousel__btn--prev");
    var next = box.querySelector(".carousel__btn--next");
    if (!track) return;

    var step = function () {
      var img = track.querySelector("img");
      return img ? img.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300;
    };
    var sync = function () {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }); });
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    // Перетаскивание мышью (на тач-устройствах работает нативный скролл).
    var startX = 0, startLeft = 0, dragging = false, moved = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      dragging = true; moved = false;
      startX = e.clientX; startLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add("is-drag"); }
      track.scrollLeft = startLeft - dx;
    });
    var end = function () {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-drag");
      if (moved) {
        var s = step();
        track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: reduce ? "auto" : "smooth" });
      }
    };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
  });
})();
