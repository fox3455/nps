import { getParkData, getInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";

function setPageMeta(info) {
  document.title = info.fullName;

  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = info.url;
  disclaimer.textContent = info.fullName;
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
    globalNav.classList.toggle("show");

    // the click may land on the icon or text inside the button
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    if (globalNav.classList.contains("show")) {
      target.setAttribute("aria-expanded", "true");
      target.setAttribute("aria-label", "Close Menu");
    } else {
      target.setAttribute("aria-expanded", "false");
      target.setAttribute("aria-label", "Open Menu");
    }
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

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData);

  setPageMeta(parkData);
  enableNavigation();
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();

