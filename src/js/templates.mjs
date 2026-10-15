import { parkInfoTemplate } from "./parkService.mjs";
import spritePath from '../images/sprite.symbol.svg';

export function mediaCardTemplate(info) {
  return `<a href="${info.link}" class="media-card">
    <img src="${info.image}" alt="" class="media-card__image" />
    <div class="media-card__content">
      <h2 class="media-card__title">${info.name}</h2>
      <p class="media-card__description">${info.description}</p>
    </div>
  </a>`;
}

export function headerTemplate(info) {
  const [heroImage] = info.images;
  return `
  <a href="${info.url}">
    <img src="${heroImage.url}" alt="${heroImage.altText}" />
  </a>
  <div class="park-header__background__overlay">
    ${parkInfoTemplate(info)}
  </div>`;
}

function getMailingAddress(addresses) {
    const mailing = addresses.find(
        address => address.type === "Mailing"
    );

    return mailing;
}

function getVoicePhoneNumber(contacts) {
    const voice = contacts.phoneNumbers.find(
        phone => phone.type === "Voice"
    );

    return voice;
}

export function footerTemplate(info) {
  const mailingAddress = getMailingAddress(info.addresses);
  const voicePhoneNumber = getVoicePhoneNumber(info.contacts);
  return `
  <div class="footerContent">
  <h3>Contact Info</h3>
  <h4>Mailing Address: </h4>
  <div><p>${mailingAddress.line1}</p></div>
  <p>${mailingAddress.city}, ${mailingAddress.stateCode} ${mailingAddress.postalCode}</p>
  <h4>Phone: </h4>
  <p>${voicePhoneNumber.phoneNumber}</p>
  <p>&copy; ${new Date().getFullYear()} National Park Service. All rights reserved.</p>
  </div>
  `;
}

export function parkAlertsTemplate(alert) {
  let alertType = "";
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  return `
  <li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

export function parkVisitorCenterTemplate(visitorCenter) {
  // some visitor centers have no address or phone listed
  const address = visitorCenter.addresses?.[0];
  const phone = visitorCenter.contacts?.phoneNumbers?.[0];
  return `
  <li class="visitor-center__list">
      <h4>${visitorCenter.name}</h4>
      <p>${visitorCenter.description}</p>
      <p><strong>Address:</strong> ${address ? `${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}` : "Not available"}</p>
      <p><strong>Phone:</strong> ${phone ? phone.phoneNumber : "Not available"}</p>
  </li>`;
}

export function parkActivitiesTemplate(activity) {
  return `<li class="activity">${activity.name}</li>`;
}