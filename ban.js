// script.js

// Sample Property Data
const properties = [
  {
    name: "Modern Apartment",
    price: 1200000,
    location: "City Center",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Cozy Cottage",
    price: 850000,
    location: "Suburb",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Luxury Villa",
    price: 2500000,
    location: "Beachside",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Urban Studio",
    price: 500000,
    location: "City Center",
    image: "https://via.placeholder.com/300x200",
  },
];

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
        <button onclick="viewDetails('${property.name}')">View Details</button>
      </div>
    `;
    propertyList.appendChild(propertyCard);
  });
}

// Apply Filters
function applyFilters() {
  const maxPrice = parseInt(document.getElementById("priceFilter").value);
  const location = document.getElementById("locationFilter").value;

  const filteredProperties = properties.filter((property) => {
    return (
      property.price <= maxPrice &&
      (location === "all" || property.location === location)
    );
  });

  loadProperties(filteredProperties);
}

// Show Details
function viewDetails(propertyName) {
  alert(`Viewing details for: ${propertyName}`);
}

// Initial Load
loadProperties(properties);