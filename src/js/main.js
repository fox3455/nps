import { getParkData, parkInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";

const parkData = getParkData();

function setPageMeta(info) {
  document.title = info.fullName;

  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = info.url;
  disclaimer.textContent = info.fullName;
}

function setupNavToggle() {
  const navToggle = document.getElementById("global-nav-toggle");
  const globalNav = document.getElementById("global-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = globalNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function setParkIntro(data) {
  const parkInfoContainer = document.querySelector(".intro");
  parkInfoContainer.innerHTML = `
  <h1 class="intro__title">${data.fullName}</h1>
  <p class="intro__description">${data.description}</p>`;
}

function setParkInfoLinks(links) {
  const parkInfoLinksContainer = document.querySelector(".info");
  parkInfoLinksContainer.insertAdjacentHTML("afterbegin", links.map(mediaCardTemplate).join(""));
}

setPageMeta(parkData);
setupNavToggle();
setHeaderFooter(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks());
