export default function setDarkmode(isDark) {
    let root = document.documentElement;
    if (isDark) {
        root.style.setProperty("--mdc-theme-primary", "#bb86fc");
        root.style.setProperty("--mdc-theme-primary-darker", "#a359fc");
        root.style.setProperty("--mdc-theme-secondary", "#03dac6");
        root.style.setProperty("--mdc-theme-background", "#121212");
        root.style.setProperty("--mdc-theme-surface", "#1f1f1f");
        root.style.setProperty("--mdc-theme-error", "#cf6679");
        root.style.setProperty("--mdc-theme-on-primary", "#000");
        root.style.setProperty("--mdc-theme-on-secondary", "#000");
        root.style.setProperty("--mdc-theme-on-surface", "#fff");
        root.style.setProperty("--mdc-theme-on-error", "#000");
        root.style.setProperty("--mdc-theme-text-primary-on-background", "#fff");
        root.style.setProperty("--mdc-theme-text-secondary-on-background", "rgba(255, 255, 255, 0.87)");
        root.style.setProperty("--mdc-theme-text-hint-on-background", "rgba(255, 255, 255, 0.6)");
        root.style.setProperty("--mdc-theme-text-disabled-on-background", "rgba(255, 255, 255, 0.38)");
        root.style.setProperty("--mdc-theme-text-divider-on-background", "rgba(255, 255, 255, 0.12)");
        root.style.setProperty("--mdc-theme-text-light-hover-on-background", "rgba(255, 255, 255, 0.05)");
        root.style.setProperty("--mdc-theme-text-light-primary-on-background", "#bb86fc");
        root.style.setProperty("--mdc-theme-text-icon-on-background", "#fff");
        root.style.setProperty("--mdc-theme-text-primary-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-secondary-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-hint-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-disabled-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-icon-on-light", "#fff");
    } else {
        root.style.setProperty("--mdc-theme-primary", "#6200ee");
        root.style.setProperty("--mdc-theme-primary-darker", "#5000c1");
        root.style.setProperty("--mdc-theme-secondary", "#018786");
        root.style.setProperty("--mdc-theme-background", "#fff");
        root.style.setProperty("--mdc-theme-surface", "#fff");
        root.style.setProperty("--mdc-theme-error", "#b00020");
        root.style.setProperty("--mdc-theme-on-primary", "#fff");
        root.style.setProperty("--mdc-theme-on-secondary", "#fff");
        root.style.setProperty("--mdc-theme-on-surface", "#000");
        root.style.setProperty("--mdc-theme-on-error", "#fff");
        root.style.setProperty("--mdc-theme-text-primary-on-background", "rgba(0, 0, 0, 0.87)");
        root.style.setProperty("--mdc-theme-text-secondary-on-background", "rgba(0, 0, 0, 0.54)");
        root.style.setProperty("--mdc-theme-text-hint-on-background", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-disabled-on-background", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-divider-on-background", "rgba(0, 0, 0, 0.12)");
        root.style.setProperty("--mdc-theme-text-light-hover-on-background", "#f5f5f5");
        root.style.setProperty("--mdc-theme-text-light-primary-on-background", "rgb(243, 235, 254)");

        root.style.setProperty("--mdc-theme-text-icon-on-background", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-primary-on-light", "rgba(0, 0, 0, 0.87)");
        root.style.setProperty("--mdc-theme-text-secondary-on-light", "rgba(0, 0, 0, 0.54)");
        root.style.setProperty("--mdc-theme-text-hint-on-light", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-disabled-on-light", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-icon-on-light", "rgba(0, 0, 0, 0.38)");
    }
};