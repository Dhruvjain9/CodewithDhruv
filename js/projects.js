
window.addEventListener("load", () => {
  const body = document.body;
  const loader = document.getElementById("loader");
  const site = document.getElementById("site");
  const counters = document.querySelectorAll(".count");

  const tl = gsap.timeline({
    onComplete: () => {
      body.classList.remove("loading");
      if (loader) loader.style.display = "none";
    },
  });

  tl.from(".loader-first", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" })
    .from(".loader-last", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
    .from(".loader-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, "-=0.2")
    .from(".loader-tag", { opacity: 0, duration: 0.4 }, "-=0.2")
    .to(loader, { opacity: 0, duration: 0.6, ease: "power2.out" })
    .to(site, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

  tl.call(() => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.count || 0);
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = `${Math.round(obj.value)}+`;
        },
      });
    });
  }, null, "-=0.2");
});
const projects = [
  {
    title: "EventFlow - Event Booking Website",
    dates: "Jan 2026 - Present",
    desc: "A UX-driven platform focused on simplifying how events are planned, managed, and experienced with a user-first workflow.",
    stack: "React - JavaScript - UX Planning",
    link: "https://github.com/Dhruvjain9/EventFlow",
  },
  {
    title: "CrickRivals - Fantasy Cricket App",
    dates: "Jun 2025 - Sep 2025",
    desc: "Fantasy cricket app with team creation, role management, point tracking, and draft saving via a PyQt GUI.",
    stack: "Python - PyQt - SQLite",
    link: "https://github.com/Dhruvjain9/CrickRivals",
  },
  {
    title: "Telephone Directory",
    dates: "Aug 2023 - Sep 2024",
    desc: "Built a Tkinter-based directory with CSV storage, MySQL integration for terminal use, and automated error logging.",
    stack: "Python - Tkinter - MySQL",
    link: "https://github.com/Dhruvjain9/Telephone-directory",
  },
  {
    title: "E-Commerce Website",
    dates: "Oct 2023",
    desc: "Built a responsive shopping experience with product browsing, search, filters, cart management, and checkout flow.",
    stack: "HTML - CSS - JavaScript",
    link: "https://github.com/Dhruvjain9/E-commerce-website",
  },
];

const projectList = document.getElementById("projectList");

projects.forEach((project, index) => {
  const item = document.createElement("div");
  item.className = "project-item";
  item.innerHTML = `
    <small>.0${index + 1}.</small>
    <a class="project-title" href="${project.link}" target="_blank" rel="noopener">
      ${project.title}
      <span class="project-link">↗</span>
    </a>
    <div class="project-meta">
      <span>${project.stack}</span>
      <span>${project.dates}</span>
    </div>
  `;
  item.addEventListener("mouseenter", () => setActiveProject(index));
  item.addEventListener("click", () => setActiveProject(index));
  projectList.appendChild(item);
});

const setActiveProject = (index) => {
  const items = projectList.querySelectorAll(".project-item");
  items.forEach((item) => item.classList.remove("active"));
  items[index].classList.add("active");
};

gsap.registerPlugin(ScrollTrigger);

const cursorHalo = document.querySelector(".cursor-halo");
const cursorOrb = document.querySelector(".cursor-orb");
const cursorSpark = document.querySelector(".cursor-spark");

if (cursorHalo && cursorOrb && cursorSpark) {
  const haloX = gsap.quickTo(cursorHalo, "x", { duration: 0.25, ease: "power3.out" });
  const haloY = gsap.quickTo(cursorHalo, "y", { duration: 0.25, ease: "power3.out" });
  const orbX = gsap.quickTo(cursorOrb, "x", { duration: 0.1, ease: "power3.out" });
  const orbY = gsap.quickTo(cursorOrb, "y", { duration: 0.1, ease: "power3.out" });
  const sparkX = gsap.quickTo(cursorSpark, "x", { duration: 0.18, ease: "power3.out" });
  const sparkY = gsap.quickTo(cursorSpark, "y", { duration: 0.18, ease: "power3.out" });

  let lastX = 0;
  let lastY = 0;

  window.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const speed = Math.min(1.6, Math.max(1, Math.hypot(dx, dy) / 18));

    haloX(e.clientX);
    haloY(e.clientY);
    orbX(e.clientX);
    orbY(e.clientY);
    sparkX(e.clientX);
    sparkY(e.clientY);

    gsap.to(cursorHalo, {
      rotation: angle,
      scale: speed,
      duration: 0.2,
      ease: "power3.out",
    });

    gsap.to(cursorSpark, {
      rotation: angle + 45,
      duration: 0.2,
      ease: "power3.out",
    });

    lastX = e.clientX;
    lastY = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    gsap.to([cursorHalo, cursorOrb, cursorSpark], { opacity: 0, duration: 0.2 });
  });

  window.addEventListener("mouseenter", () => {
    gsap.to([cursorHalo, cursorOrb, cursorSpark], { opacity: 1, duration: 0.2 });
  });
}

gsap.from("header.hero", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power3.out",
});

const typingEl = document.querySelector(".typing");
const typingRoles = typingEl ? typingEl.dataset.roles.split(",") : [];
let typingIndex = 0;
let typingChar = 0;
let typingDeleting = false;

const typeLoop = () => {
  if (!typingEl || typingRoles.length === 0) return;
  const current = typingRoles[typingIndex];
  if (!typingDeleting) {
    typingChar++;
    typingEl.textContent = current.slice(0, typingChar);
    if (typingChar === current.length) {
      typingDeleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typingChar--;
    typingEl.textContent = current.slice(0, typingChar);
    if (typingChar === 0) {
      typingDeleting = false;
      typingIndex = (typingIndex + 1) % typingRoles.length;
    }
  }
  setTimeout(typeLoop, typingDeleting ? 50 : 80);
};

typeLoop();

gsap.to(".orb-1", { y: 40, x: -20, duration: 6, repeat: -1, yoyo: true });
gsap.to(".orb-2", { y: -30, x: 30, duration: 8, repeat: -1, yoyo: true });
gsap.to(".orb-3", { y: 25, x: 25, duration: 5, repeat: -1, yoyo: true });
gsap.to(".orb-4", { y: -40, x: -30, duration: 7, repeat: -1, yoyo: true });

gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    scale: 0.98,
    y: 30,
    filter: "blur(6px)",
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 88%",
    },
  });
});

gsap.utils.toArray(".project-item").forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    scale: 0.98,
    y: 30,
    filter: "blur(6px)",
    duration: 0.6,
    delay: index * 0.05,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 88%",
    },
  });
});

gsap.from(".stat", {
  scale: 0.98,
  opacity: 0,
  duration: 0.6,
  stagger: 0.08,
  scrollTrigger: {
    trigger: ".stats",
    start: "top 88%",
  },
});

gsap.utils.toArray(".stack-row").forEach((row) => {
  const items = row.querySelectorAll(".stack-item");
  gsap.fromTo(
    items,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: row,
        start: "top 95%",
        end: "top 55%",
        scrub: true,
      },
    }
  );
});

gsap.fromTo(
  ".cert-card, .edu-card, .contact-card",
  { opacity: 0, y: 18 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.06,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".certs",
      start: "top 95%",
      end: "top 55%",
      scrub: true,
    },
  }
);

const magneticItems = document.querySelectorAll(".magnetic");

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const bounds = item.getBoundingClientRect();
    const relX = e.clientX - bounds.left - bounds.width / 2;
    const relY = e.clientY - bounds.top - bounds.height / 2;
    gsap.to(item, {
      x: relX * 0.2,
      y: relY * 0.2,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
  });
});

magneticItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(cursorRing, { scale: 1.6, duration: 0.25, ease: "power3.out" });
    gsap.to(cursorTrail, { scale: 0.8, duration: 0.25, ease: "power3.out" });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(cursorRing, { scale: 1, duration: 0.25, ease: "power3.out" });
    gsap.to(cursorTrail, { scale: 1, duration: 0.25, ease: "power3.out" });
  });
});
