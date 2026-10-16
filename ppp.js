const listings = [
  {
    id: 1,
    title: "Cozy Apartment in NYC",
    location: "New York",
    price: "$2,500/month",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    title: "Luxury Villa in Miami",
    location: "Miami",
    price: "$4,500/month",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    title: "Family Home in Austin",
    location: "Austin",
    price: "$3,200/month",
    image: "https://via.placeholder.com/300"
  }
];

const listingContainer = document.getElementById("listingContainer");
const searchBar = document.getElementById("searchBar");

// Display Listings
function displayListings(data) {
  listingContainer.innerHTML = "";
  data.forEach(listing => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${listing.image}" alt="${listing.title}">
      <h3>${listing.title}</h3>
      <p>${listing.location}</p>
      <p>${listing.price}</p>
    `;
    listingContainer.appendChild(card);
  });
}

// Filter Listings
searchBar.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filteredListings = listings.filter(listing =>
    listing.location.toLowerCase().includes(searchValue)
  );
  displayListings(filteredListings);
});

// Initial Display
displayListings(listings);