import { headerTemplate, footerTemplate } from "./templates.mjs";

export function setHeaderFooter(park) {
    const header = document.querySelector(".park-header__background");
    header.innerHTML = headerTemplate(park);
    const footer = document.querySelector("footer");
    footer.innerHTML = footerTemplate(park);
}