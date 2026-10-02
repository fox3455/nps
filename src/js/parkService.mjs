const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok");
  return data;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

function parkInfoLinks() {
  const info = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    description: "Learn about the visitor centers in the park."
  }
];
  return info;
}

export function getInfoLinks(data) {
  const images = data.images;
  const links = parkInfoLinks().map((item, index) => {
    // start at the 3rd image and wrap back to the start if the park has fewer images
    const image = images.length > 0 ? images[(index + 2) % images.length].url : "";
    return { ...item, image };
  });
  return links;
}

export function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="nps-park-header__title__info">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}