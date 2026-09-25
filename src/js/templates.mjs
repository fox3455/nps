import { parkInfoTemplate } from "./parkService.mjs";

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