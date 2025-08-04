dayjs.extend(dayjs_plugin_duration);

/**
 * SIDEBAR NAVIGATION
 */

const navbar = document.querySelector("#navbar");
const openBtn = document.querySelector("#open-sidebar-btn");
const media = window.matchMedia("(width < 700px)");

const navLinks = document.querySelectorAll("nav a");

// close sidebar when a selection is made
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeSidebar();
    });
});

// if on mobile device, make navigation untabbable when not expanded
media.addEventListener("change", (e) => updateNavbar(e));

function updateNavbar(e) {
    const isMobile = e.matches;
    console.log(isMobile);
    if (isMobile) {
        navbar.setAttribute("inert", "");
    } else {
        navbar.removeAttribute("inert", "");
    }
}

function openSidebar() {
    navbar.classList.add("show");
    openBtn.setAttribute("aria-expanded", "true");
    navbar.removeAttribute("inert", "");
}

function closeSidebar() {
    navbar.classList.remove("show");
    openBtn.setAttribute("aria-expanded", "false");
    navbar.setAttribute("inert", "");
}

updateNavbar(media);

/**
 * LIGHT / DARK MODE
 */

let lightmode = localStorage.getItem("lightmode");
const themeSwitch = document.querySelector("#theme-switch");
const svgIcons = document.querySelectorAll("svg");

if (lightmode === "active") enableLightMode();

themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem("lightmode");
    lightmode !== "active" ? enableLightMode() : disableLightMode();
});

function enableLightMode() {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "active");
    svgIcons.forEach((icon) => icon.setAttribute("fill", "#1E1E1E"));
}

function disableLightMode() {
    document.body.classList.remove("lightmode");
    localStorage.setItem("lightmode", null);
    svgIcons.forEach((icon) => icon.setAttribute("fill", "#FFF"));
}
