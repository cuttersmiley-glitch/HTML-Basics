// Initialize Google Maps
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 }, // Default to New York City
    zoom: 12,
  });

  // Example marker
  new google.maps.Marker({
    position: { lat: 40.7128, lng: -74.0060 },
    map,
    title: "Sample Property",
  });
}

// Handle Search Form Submission
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Search functionality will be added later!");
});