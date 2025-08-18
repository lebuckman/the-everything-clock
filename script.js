dayjs.extend(dayjs_plugin_duration);

const clockContainer = document.querySelector("#clock");
const activityContainer = document.querySelector("#activity");
const dateInput = document.querySelector("#date");
const confirmInputBtn = document.querySelector("#confirm-modal-btn");

/**
 * COUNTDOWN (DAYS UNTIL X)
 */

let countdownInterval;

confirmInputBtn.addEventListener("click", () => {
    activateCountdown(dateInput.value);
    closeModal();
});

function activateCountdown(dateString) {
    const targetDate = dayjs(dateString);

    activityContainer.querySelector(".date-display").textContent =
        targetDate.format("D MMMM YYYY");

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = dayjs();
        const countdown = dayjs.duration(targetDate.diff(now));

        if (countdown.asMilliseconds() <= 0) return;

        clockContainer.querySelector(".clock--seconds").textContent = countdown
            .seconds()
            .toString()
            .padStart(2, "0");
        clockContainer.querySelector(".clock--minutes").textContent = countdown
            .minutes()
            .toString()
            .padStart(2, "0");
        clockContainer.querySelector(".clock--hours").textContent = countdown
            .hours()
            .toString()
            .padStart(2, "0");
        clockContainer.querySelector(".clock--days").textContent = countdown
            .asDays()
            .toFixed(0)
            .toString()
            .padStart(2, "0");
    }, 250);
}

/**
 * INPUT MODAL
 */

const modal = document.querySelector("#input-modal");

function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

/**
 * SIDEBAR NAVIGATION
 */

const navbar = document.querySelector("#navbar");
const openBtn = document.querySelector("#open-sidebar-btn");
const media = window.matchMedia("(width < 700px)");

const navLinks = document.querySelectorAll("nav a");

// close sidebar when a selection is made
navLinks.forEach((link) => {
    link.addEventListener("click", () => closeSidebar());
});

// if on mobile device, make navigation untabbable when not expanded
media.addEventListener("change", (e) => updateNavbar(e));

function updateNavbar(e) {
    const isMobile = e.matches;

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
