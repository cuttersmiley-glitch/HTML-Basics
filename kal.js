// script.js

// Sample Property Data with Coordinates
const properties = [
  {
    name: "Modern Apartment",
    price: 1200000,
    location: "City Center",
    bedrooms: 2,
    lat: 40.712776,
    lng: -74.005974,
    description: "A beautiful modern apartment located in the heart of the city.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Cozy Cottage",
    price: 850000,
    location: "Suburb",
    bedrooms: 3,
    lat: 34.052235,
    lng: -118.243683,
    description: "A cozy cottage with a spacious garden in a quiet suburb.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Luxury Villa",
    price: 2500000,
    location: "Beachside",
    bedrooms: 5,
    lat: 25.761681,
    lng: -80.191788,
    description: "A luxury villa with ocean views and a private pool.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Urban Studio",
    price: 500000,
    location: "City Center",
    bedrooms: 1,
    lat: 37.774929,
    lng: -122.419418,
    description: "A compact and affordable studio apartment in a prime location.",
    image: "https://via.placeholder.com/300x200",
  },
];

// Calculate Distance Between Two Points (Haversine Formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Load Properties Initially
function loadProperties(filteredProperties) {
  const propertyList = document.getElementById("propertyList");
  propertyList.innerHTML = ""; // Clear previous listings

  filteredProperties.forEach((property) => {
    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    propertyCard.innerHTML = `
      <img src="${property.image}" alt="${property.name}">
      <div class="property-info">
        <h2>${property.name}</h2>
        <p>Price: $${property.price.toLocaleString()}</p>
        <p>Location: ${property.location}</p>
        <p>Bedrooms: ${property.bedrooms}</p>
        <button onclick="viewDetails('${property.name}')">View Details</button>
      </div>
    `;
    propertyList.appendChild(propertyCard);
  });

  updateMap(filteredProperties);
}

// Apply Filters
function applyFilters() {
  const maxPrice = parseInt(document.getElementById("priceFilter").value);
  const location = document.getElementById("locationFilter").value;
  const bedrooms = parseInt(document.getElementById("bedroomsFilter").value);
  const maxDistance = parseFloat(document.getElementById("distanceFilter").value);
  const userLocation = document.getElementById("userLocation").value;

  const [userLat, userLng] = userLocation.split(",").map(Number);

  const filteredProperties = properties.filter((property) => {
    const distance = calculateDistance(userLat, userLng, property.lat, property.lng);

    return (
      property.price <= maxPrice &&
      (location === "all" || property.location === location) &&
      (isNaN(bedrooms) || property.bedrooms >= bedrooms) &&
      (!maxDistance || distance <= maxDistance)
    );
  });

  loadProperties(filteredProperties);
}

// Initialize Map
let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.774929, lng: -122.419418 },
    zoom: 4,
  });

  loadProperties(properties);
}

// Update Map with Properties
function updateMap(propertiesToShow) {
  // Clear existing markers
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  // Add new markers
  propertiesToShow.forEach((property) => {
    const marker = new google.maps.Marker({
      position: { lat: property.lat, lng: property.lng },
      map: map,
      title: property.name,
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <h3>${property.name}</h3>
        <p>Price: $${property.price.toLocaleString()}</p>
        <p>Bedrooms: ${property.bedrooms}</p>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    markers.push(marker);
  });
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  loadProperties(properties);
});