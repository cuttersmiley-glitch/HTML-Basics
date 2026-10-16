// script.js

// Sample Property Data
const properties = [
  {
    name: "Modern Apartment",
    price: 1200000,
    location: "City Center",
    bedrooms: 2,
    description: "A beautiful modern apartment located in the heart of the city.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Cozy Cottage",
    price: 850000,
    location: "Suburb",
    bedrooms: 3,
    description: "A cozy cottage with a spacious garden in a quiet suburb.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Luxury Villa",
    price: 2500000,
    location: "Beachside",
    bedrooms: 5,
    description: "A luxury villa with ocean views and a private pool.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Urban Studio",
    price: 500000,
    location: "City Center",
    bedrooms: 1,
    description: "A compact and affordable studio apartment in a prime location.",
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
        <p>Bedrooms: ${property.bedrooms}</p>
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
  const bedrooms = parseInt(document.getElementById("bedroomsFilter").value);

  const filteredProperties = properties.filter((property) => {
    return (
      property.price <= maxPrice &&
      (location === "all" || property.location === location) &&
      (isNaN(bedrooms) || property.bedrooms >= bedrooms)
    );
  });

  loadProperties(filteredProperties);
}

// Show Property Details in Modal
function viewDetails(propertyName) {
  const property = properties.find((p) => p.name === propertyName);
  const modalDetails = document.getElementById("modalDetails");
  const modal = document.getElementById("propertyModal");

  modalDetails.innerHTML = `
    <h2>${property.name}</h2>
    <img src="${property.image}" alt="${property.name}" style="width: 100%;">
    <p><strong>Price:</strong> $${property.price.toLocaleString()}</p>
    <p><strong>Location:</strong> ${property.location}</p>
    <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
    <p>${property.description}</p>
  `;

  modal.style.display = "flex";
}

// Close Modal
function closeModal() {
  const modal = document.getElementById("propertyModal");
  modal.style.display = "none";
}

// Initial Load
loadProperties(properties);