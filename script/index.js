//fetch api for category sections

const categoryDataLoad = () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryData(data.categories));
};

const displayCategoryData = (items) => {
  const plantCategory = document.getElementById("plant-category");
  plantCategory.innerHTML = "";

  //show all trees

  const allTrees = document.createElement("p");
  allTrees.classList.add("category-item", "active", "cursor-pointer");
  allTrees.textContent = "All Trees";
  allTrees.onclick = () => {
    plantDataLoad();
    setActive(allTrees);
  };
  plantCategory.append(allTrees);

  //add category from api

  items.forEach((item) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <p class="category-item cursor-pointer" onclick="idWiseDataload(${item.id}, this)">
        ${item.category_name}
      </p>
    `;
    plantCategory.append(categoryDiv);
  });
};

//for active the category element

function setActive(element) {
  const allCategories = document.querySelectorAll(".category-item");
  allCategories.forEach((cat) => cat.classList.remove("active"));
  element.classList.add("active");
}

//plants section

const plantDataLoad = () => {
  const url = "https://openapi.programming-hero.com/api/plants";

  fetch(url)
    .then((res) => res.json())
    .then((data) => plantDataDisplay(data.plants));
};

//plant add to cart

const plantDataDisplay = (plants) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const cardsContainerDiv = document.createElement("div");
    cardsContainerDiv.innerHTML = `
      <div onclick="loadPlantDetails(${plant.id})"
       class="card bg-white rounded-xl overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300">
        <img src="${
          plant.image
        }" alt="" class="w-full h-48 object-cover rounded-lg mb-3"/>
        <p class="text-lg font-bold mb-1">${plant.name}</p>
        <p class="text-sm text-justify mb-2 line-clamp-3">${
          plant.description
        }</p>
        <div class="flex justify-between items-center mb-3">
          <p class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">${
            plant.category
          }</p>
          <p class="text-xl font-bold">৳<span>${plant.price}</span></p>
        </div>
        <button onclick='addToCart(${JSON.stringify(
          plant
        )})' class="bg-[#15803D] text-white font-semibold w-full py-2 cursor-pointer rounded-lg">Add To cart</button>
      </div>
    `;
    cardsContainer.append(cardsContainerDiv);
  });
};

//category click function

const idWiseDataload = (id, element) => {
  setActive(element); // ✅ Active class update

  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => idWiseDataDisplay(data.plants));
};

const idWiseDataDisplay = (items) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  items.forEach((item) => {
    const cardsContainerDiv = document.createElement("div");
    cardsContainerDiv.innerHTML = `
      <div 
        onclick="loadPlantDetails(${item.id})"
        class="card bg-white rounded-xl overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300"
      >
        <img src="${
          item.image
        }" alt="" class="w-full h-48 object-cover rounded-lg mb-3"/>
        <p class="text-lg font-bold mb-1">${item.name}</p>
        <p class="text-sm text-justify mb-2 line-clamp-3">${
          item.description
        }</p>
        <div class="flex justify-between items-center mb-3">
          <p class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">${
            item.category
          }</p>
          <p class="text-xl font-bold">৳<span>${item.price}</span></p>
        </div>
        <button 
          class="bg-[#15803D] text-white font-semibold w-full py-2 rounded-lg"
          onclick="handleAddToCart(event, ${JSON.stringify(item)})"
        >
          Add To cart
        </button>
      </div>
    `;
    cardsContainer.append(cardsContainerDiv);
  });
};

function handleAddToCart(event, item) {
  event.stopPropagation();
  addToCart(item);
}

//CART DIV
const cartContainer = document.querySelector(".cart-container");

//Add to cart plats
let cartItems = [];

function addToCart(plant) {
  cartItems.push(plant);
  updateCartUI();
}

function updateCartUI() {
  let cartHTML = `<h2 class="text-[20px] font-semibold p-1">Your Cart</h2>`;

  if (cartItems.length === 0) {
    cartHTML += `<p class="p-2 text-sm text-gray-500">Your cart is empty</p>`;
  } else {
    let total = 0;

    cartItems.forEach((item, index) => {
      total = total + item.price;

      cartHTML += `
        <div class="flex justify-between items-center p-2 border-b border-gray-200">
          <div>
            <p class="font-semibold text-sm">${item.name}</p>
            <p class="text-xs text-gray-600">৳ ${item.price}</p>
          </div>
          <button onclick="removeFromCart(${index})" class="text-red-500 text-3xl font-bold">&times;</button>
        </div>
      `;
    });

    cartHTML += `
      <div class="p-2 font-semibold text-lg flex justify-between">
        <span>Total:</span>
        <span>৳ ${total}</span>
      </div>
    `;
  }

  cartContainer.innerHTML = cartHTML;
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}

plantDataLoad();
categoryDataLoad();
updateCartUI();

// Function: load plant details by id
const loadPlantDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.plants));
};

// modal show with plant
const showModal = (plant) => {
  const modal = document.getElementById("plantModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="card bg-white rounded-xl overflow-hidden p-4">
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-64 object-cover rounded-lg mb-3"/>
      <h2 class="text-2xl font-bold mb-2">${plant.name}</h2>
      <p class="text-sm text-justify mb-3">${plant.description}</p>
      <div class="flex justify-between items-center mb-3">
        <p class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">${plant.category}</p>
        <p class="text-xl font-bold">৳ ${plant.price}</p>
      </div>
      
    </div>
  `;

  //modal showing
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

//modal close function
document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("plantModal");
  modal.classList.add("hidden");
});
