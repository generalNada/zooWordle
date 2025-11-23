console.log("Hello World!");
const countrySelect = document.getElementById("countrySelect");
const countryInfo = document.getElementById("countryInfo");
const countryName = document.getElementById("countryName");
const flag = document.getElementById("flag");
const capital = document.getElementById("capital");
const population = document.getElementById("population");
const region = document.getElementById("region");
const languages = document.getElementById("languages");
const mapContainer = document.getElementById("map");

let allCountries = [];
let map;
let marker;
let geoLayer;

// Load countries for dropdown
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    countrySelect.innerHTML =
      '<option value="">--Select a country--</option>' +
      allCountries
        .map(
          (country) =>
            `<option value="${country.cca3}">${country.name.common}</option>`
        )
        .join("");
  });

countrySelect.addEventListener("change", async (e) => {
  const selected = allCountries.find(
    (country) => country.cca3 === e.target.value
  );

  if (!selected) return;

  // Set country info
  countryName.textContent = selected.name.common;
  flag.src = selected.flags.svg;
  flag.alt = `${selected.name.common} flag`;
  capital.textContent = selected.capital ? selected.capital[0] : "N/A";
  population.textContent = selected.population.toLocaleString();
  region.textContent = selected.region;
  languages.textContent = selected.languages
    ? Object.values(selected.languages).join(", ")
    : "N/A";

  countryInfo.classList.remove("hidden");

  const capitalCoords = selected.capitalInfo?.latlng;
  const countryCode = selected.cca3;

  // Initialize map if needed
  if (!map) {
    map = L.map("map", {
      scrollWheelZoom: true,
      touchZoom: true,
      //   zoomControl: true,
      dragging: true,
      tap: false,
    }).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  }

  // Remove old shapes and markers
  if (geoLayer) map.removeLayer(geoLayer);
  if (marker) map.removeLayer(marker);

  // Load world GeoJSON and filter for selected country
  const geoRes = await fetch(
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
  );
  const geoData = await geoRes.json();

  const match = geoData.features.find((f) => f.id === countryCode);

  if (match) {
    geoLayer = L.geoJSON(match, {
      style: {
        color: "#0077cc",
        weight: 2,
        fillColor: "#cce5ff",
        fillOpacity: 0.3,
      },
    }).addTo(map);

    const countryBounds = geoLayer.getBounds();

    if (capitalCoords && capitalCoords.length === 2) {
      // Convert capital coords to a LatLngBounds object
      const capitalLatLng = L.latLng(capitalCoords[0], capitalCoords[1]);
      const combinedBounds = L.latLngBounds([countryBounds, capitalLatLng]);

      map.flyToBounds(combinedBounds, {
        padding: [20, 20],
        maxZoom: 6,
      });
    } else {
      map.flyToBounds(countryBounds, {
        padding: [20, 20],
        maxZoom: 6,
      });
    }
  }

  // Add marker for capital
  if (capitalCoords) {
    marker = L.marker(capitalCoords)
      .addTo(map)
      .bindPopup(`${selected.capital[0]}`)
      .openPopup();
  }

  mapContainer.classList.remove("hidden");

  // Fixes rendering glitch on reload
  setTimeout(() => {
    map.invalidateSize();
  }, 200);
});

requestAnimationFrame(() => {
  map.invalidateSize();
});

// Rivers --- Rivers --- Rivers --- Rivers --- Rivers --- Rivers --- Rivers

let riversData = {};

fetch("rivers.json")
  .then((res) => res.json())
  .then((data) => {
    riversData = data;
  });

const riversList = document.getElementById("riversList");
riversList.innerHTML = "";

const rivers = riversData[selected.cca3];
if (rivers && rivers.length > 0) {
  rivers.forEach((river) => {
    const li = document.createElement("li");
    li.textContent = river;
    riversList.appendChild(li);
  });
  document.getElementById("riversContainer").classList.remove("hidden");
} else {
  document.getElementById("riversContainer").classList.add("hidden");
}
