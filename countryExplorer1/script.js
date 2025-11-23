(function() {
  'use strict';
  
  // Wait for DOM to be ready
  function init() {
    const countrySelect = document.getElementById("countrySelect");
    const countryInfo = document.getElementById("countryInfo");
    const countryName = document.getElementById("countryName");
    const flag = document.getElementById("flag");
    const capital = document.getElementById("capital");
    const population = document.getElementById("population");
    const region = document.getElementById("region");
    const languages = document.getElementById("languages");
    const mapContainer = document.getElementById("map");
    const riversContainer = document.getElementById("riversContainer");
    const riversList = document.getElementById("riversList");

    // Check if elements exist (important when embedded)
    if (!countrySelect) {
      console.error("Country Explorer: Required DOM elements not found");
      return;
    }

    let allCountries = [];
    let map;
    let marker;
    let geoLayer;

    async function loadCountries() {
      countrySelect.innerHTML = '<option value="">--Loading countries--</option>';

      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital,population,region,languages,capitalInfo"
        );

        if (!res.ok) {
          throw new Error(`REST Countries request failed: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected REST Countries response");
        }

        allCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        const options =
          '<option value="">--Select a country--</option>' +
          allCountries
            .map(
              (country) =>
                `<option value="${country.cca3}">${country.name.common}</option>`
            )
            .join("");

        countrySelect.innerHTML = options;
      } catch (err) {
        console.error("Unable to load countries", err);
        countrySelect.innerHTML =
          '<option value="">--Failed to load countries--</option>';
      }
    }

    loadCountries();

    let riversData = {};

    async function loadRivers() {
      try {
        const res = await fetch("rivers.json");
        if (!res.ok) {
          throw new Error(`Rivers request failed: ${res.status}`);
        }
        riversData = await res.json();
      } catch (err) {
        console.error("Unable to load rivers data", err);
        riversData = {};
      }
    }

    function renderRivers(countryCode) {
      riversList.innerHTML = "";
      const rivers = riversData[countryCode];

      if (!Array.isArray(rivers) || rivers.length === 0) {
        riversContainer.classList.add("hidden");
        return;
      }

      rivers.forEach((river) => {
        const li = document.createElement("li");
        li.textContent = river;
        riversList.appendChild(li);
      });

      riversContainer.classList.remove("hidden");
    }

    loadRivers();

    countrySelect.addEventListener("change", async (e) => {
      const selected = allCountries.find(
        (country) => country.cca3 === e.target.value
      );

      if (!selected) {
        countryInfo.classList.add("hidden");
        mapContainer.classList.add("hidden");
        riversContainer.classList.add("hidden");
        return;
      }

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

      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      renderRivers(selected.cca3);
    });

    requestAnimationFrame(() => {
      if (map) {
        map.invalidateSize();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }
})();