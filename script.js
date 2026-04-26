// page indicator-- mouse tracker--for navbar
const menu = document.querySelector(".main-menu-bar");
const indicator = document.querySelector(".page-indicator");

if (menu && indicator) {
  let targetX = 0;
  let currentX = 0;
  let active = false;

  menu.addEventListener("mousemove", (e) => {
    const rect = menu.getBoundingClientRect();
    targetX = e.clientX - rect.left;
  });

  menu.addEventListener("mouseenter", (e) => {
    const rect = menu.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    currentX = targetX;
    indicator.style.opacity = "1";
    active = true;
  });

  menu.addEventListener("mouseleave", () => {
    indicator.style.opacity = "0";
    active = false;
  });

  function animateIndicator() {
    currentX += (targetX - currentX) * 0.14;

    indicator.style.left = `${currentX}px`;

    requestAnimationFrame(animateIndicator);
  }

  animateIndicator();
}
// -----------------------------------------------------------------------
// js code for jelly that follows mouse on the hero section
const hero = document.querySelector(".hero-container");
const main = document.querySelector(".main-jelly");
const two = document.querySelector(".jelly-two");
const three = document.querySelector(".jelly-three");
const canvas = document.querySelector(".jelly-canvas");

if (hero && main && two && three && canvas) {
  const ctx = canvas.getContext("2d");

  const size = 190;
  const radius = size / 2;

  canvas.width = size;
  canvas.height = size;

  let snapshot = null;

  let mouseX = hero.offsetWidth / 2;
  let mouseY = hero.offsetHeight / 2;

  let p1 = { x: mouseX, y: mouseY };
  let p2 = { x: mouseX, y: mouseY };
  let p3 = { x: mouseX, y: mouseY };

  function captureHero() {
    html2canvas(hero, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    }).then((canvasShot) => {
      snapshot = canvasShot;
    });
  }

  captureHero();
  window.addEventListener("resize", captureHero);

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function drawLens() {
  if (!snapshot) return;

  ctx.clearRect(0, 0, size, size);

  ctx.save();

  ctx.beginPath();
  ctx.arc(radius, radius, radius - 2, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = "rgba(235,240,245,0.95)";
  ctx.fillRect(0,0,size,size);

  const zoom = 1.6;

  const scaleX = snapshot.width / hero.offsetWidth;
  const scaleY = snapshot.height / hero.offsetHeight;

  const sourceSize = size / zoom;

  const sx = (p1.x * scaleX) - (sourceSize * scaleX / 2);
  const sy = (p1.y * scaleY) - (sourceSize * scaleY / 2);

  ctx.drawImage(
    snapshot,
    sx,
    sy,
    sourceSize * scaleX,
    sourceSize * scaleY,
    0,
    0,
    size,
    size
  );

  ctx.restore();
}
  function animate() {
    p1.x += (mouseX - p1.x) * 0.15;
    p1.y += (mouseY - p1.y) * 0.15;

    p2.x += (p1.x - p2.x) * 0.10;
    p2.y += (p1.y - p2.y) * 0.10;

    p3.x += (p2.x - p3.x) * 0.08;
    p3.y += (p2.y - p3.y) * 0.08;

    main.style.left = `${p1.x}px`;
    main.style.top = `${p1.y}px`;

    two.style.left = `${p2.x}px`;
    two.style.top = `${p2.y}px`;

    three.style.left = `${p3.x}px`;
    three.style.top = `${p3.y}px`;

    drawLens();

    requestAnimationFrame(animate);
  }

  animate();
}
const btn = document.querySelector(".hire-me-button");

if (btn) {
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "transform 0.12s ease";
  });

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);

    btn.style.transform =
      `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
}
// ---------------------------------------------------------------------------------------------
// background radom black particles on the hero page
const particleWrap = document.querySelector(".hero-particles");

if (particleWrap) {
  for (let i = 0; i < 100; i++) {
    const dot = document.createElement("span");

    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;

    const size = Math.random() * 5 + 2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    dot.style.animationDuration = `${6 + Math.random() * 10}s`;
    dot.style.animationDelay = `${Math.random() * 5}s`;

    particleWrap.appendChild(dot);
  }
}
// -------------------------------------------------------------------------------------------------------
// tex changing animation of the hero page
const roles = [
  "Software Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "Problem Solver",
  "Tech Enthusiast"
];

const text = document.getElementById("changing-text");
let index = 0;

setInterval(() => {
  text.classList.add("wipe");

  setTimeout(() => {
    index = (index + 1) % roles.length;
    text.textContent = roles[index];
  }, 350); // change text mid wipe

  setTimeout(() => {
    text.classList.remove("wipe");
  }, 700);

}, 2500);
// ------------------------------------------------------------------------------------------------------------