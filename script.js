dayjs.extend(dayjs_plugin_duration);

// light / dark mode logic

let lightmode = localStorage.getItem("lightmode");
const themeSwitch = document.querySelector("#theme-switch");

if (lightmode === "active") enableLightMode();

themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem("lightmode");
    lightmode !== "active" ? enableLightMode() : disableLightMode();
});

function enableLightMode() {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "active");
}

function disableLightMode() {
    document.body.classList.remove("lightmode");
    localStorage.setItem("lightmode", null);
}
