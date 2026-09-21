import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function setPageMeta(info) {
  document.title = info.fullName;

  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = info.url;
  disclaimer.textContent = info.fullName;
}

function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="nps-park-header__title__info">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function renderParkHeader(info) {
  const parkHeaderBackground = document.querySelector(".park-header__background img");
  const parkHeaderLink = document.querySelector(".park-header__background > a");
  const parkHeaderOverlay = document.querySelector(".park-header__background__overlay");
  const [heroImage] = info.images;

  parkHeaderBackground.src = heroImage.url;
  parkHeaderBackground.alt = heroImage.altText;
  parkHeaderLink.href = info.url;
  parkHeaderOverlay.innerHTML = parkInfoTemplate(info);
}

function setupNavToggle() {
  const navToggle = document.getElementById("global-nav-toggle");
  const globalNav = document.getElementById("global-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = globalNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

setPageMeta(parkData);
renderParkHeader(parkData);
setupNavToggle();
