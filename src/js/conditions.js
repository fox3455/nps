import { getParkData, getInfoLinks, getParkAlerts, getParkActivities, getParkVisitors } from "./parkService.mjs";
import { parkAlertsTemplate, parkVisitorCenterTemplate, parkActivitiesTemplate } from "./templates.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";
import "../css/style.css"; // we can do this type of import because we are using Vite
import "../css/conditions.css";

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
  <h1 class="intro__title">Current Conditions</h1>
  <p class="intro__description">${data.description}</p>`;
}

function setAlerts(alerts) {
  const alertsContainer = document.querySelector("#alerts");
  if (alerts.length > 0) {
    alertsContainer.innerHTML = `
    <ul>${alerts.map(parkAlertsTemplate).join("")}</ul>`;
  } else {
    alertsContainer.innerHTML = "<p>No current alerts.</p>";
  }
}

function setVisitors(visitors) {
  const visitorsContainer = document.querySelector("#visitors");
  if (visitors.length > 0) {
    visitorsContainer.innerHTML = `
    <h2>Visitor Services</h2>
    <details class="visitor-center">
    <summary>Visitor Centers</summary>
    <ul>${visitors.map(parkVisitorCenterTemplate).join("")}</ul>
    </details>`;
  } else {
    visitorsContainer.innerHTML = "<p>No current visitor centers.</p>";
  }
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector("#activities");
  if (activities.length > 0) {
    activitiesContainer.innerHTML = `
    <h2>Activities</h2>
    <details class="activities">
    <summary>All Activities</summary>
      <ul>${activities.map(parkActivitiesTemplate).join("")}</ul>
    </details>`;
  } else {
    activitiesContainer.innerHTML = "<p>No current activities.</p>";
  }
}

async function init() {
  const parkData = await getParkData();
  const alerts = await getParkAlerts();
  const visitors = await getParkVisitors();
  const activities = await getParkActivities();
  const links = getInfoLinks(parkData);

  setPageMeta(parkData);
  setupNavToggle();
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setAlerts(alerts);
  setVisitors(visitors);
  setActivities(activities);
}

init();