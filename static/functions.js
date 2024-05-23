let currentPage = 1;
let currentSearchQuery = "";

async function renderProducts() {
  toggleLoader(true);
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  const productsToRender = await fetchProducts(currentPage, currentSearchQuery);
  if (productsToRender.length < 1) {
    renderMessageInsteadOfTable("No Products To Show !");
  }
  productsToRender.forEach((product) => {
    const productToAppend = document.createElement("tr");
    productToAppend.innerHTML = `
        <tr>
          <td>${product.title}</td>
          <td>${product.description}</td>
          <td>${product.price}$</td>
          <td>${product.rating}</td>
          <td>${product.stock}</td>
          <td>${product.brand}</td>
          <td>${product.category}</td>
          <td><img class="thumbnail" src=${product.thumbnail} alt=${product.description}></img></td>
          <td><button class="gallery-button" onclick='toggleGallery(this)'>Gallery</button></td>
        </tr>`;
    productToAppend.onclick = function () {
      setActiveRow(productToAppend);
    };
    const galleryRow = document.createElement("tr");
    galleryRow.classList.add("gallery-row");
    galleryRow.innerHTML = `
            <td colspan="9">
              <div class="gallery">
                ${product.images
                  .slice(0, 3)
                  .map(
                    (image) =>
                      `<img src="${image}" alt="Product Image" onclick="openModal('${image}','Product Image')">`
                  )
                  .join("")}
              </div>
            </td>
            `;
    tableBody.appendChild(productToAppend);
    tableBody.appendChild(galleryRow);
  });
  toggleLoader();
}

async function changePage(direction) {
  if (currentPage == 1 && direction == -1) {
    return;
  }
  currentPage += direction;
  document.getElementById("page-number").textContent = `Page ${currentPage}`;
  renderProducts();
}

async function fetchProducts(page, query = "") {
  const response = await fetch(`/products?page=${page}&q=${query}`);
  const data = await response.json();
  return data;
}

async function search(event) {
  event.preventDefault();
  currentPage = 1;
  currentSearchQuery = document
    .getElementById("search-input")
    .value.toLowerCase();
  document.getElementById("page-number").textContent = `Page 1`;
  toggleTableVisibility(true);
  renderProducts();
}

async function clear(event) {
  event.preventDefault();
  currentPage = 1;
  currentSearchQuery = "";
  document.getElementById("search-input").value = "";
  document.getElementById("page-number").textContent = `Page 1`;
  toggleTableVisibility(true);
  renderProducts();
}

function setActiveRow(activeRow) {
  const rows = document.querySelectorAll("#table-body tr");
  rows.forEach((row) => {
    row.classList.remove("active-row");
  });
  activeRow.classList.add("active-row");
}

function toggleTableVisibility(show) {
  const table = document.getElementById("table-root");
  if (show) {
    table.style.display = "table";
    const messageDiv = document.getElementById("message-div");
    messageDiv.style.display = "none";
  } else {
    table.style.display = "none";
  }
}

function toggleLoader(show) {
  if (show) {
    document.getElementById("loader").style.display = "block";
  } else {
    document.getElementById("loader").style.display = "none";
  }
}

function renderMessageInsteadOfTable(msg) {
  toggleTableVisibility();
  const messageDiv = document.getElementById("message-div");
  messageDiv.style.display = "block";
  messageDiv.innerHTML = msg;
}

function toggleGallery(button) {
  const galleryRow = button.parentElement.parentElement.nextElementSibling;
  if (galleryRow.style.display === "none" || !galleryRow.style.display) {
    document
      .querySelectorAll(".gallery-row")
      .forEach((row) => (row.style.display = "none"));
    galleryRow.style.display = "table-row";
  } else {
    galleryRow.style.display = "none";
  }
}

function openModal(src, alt) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = alt;
}

function closeModal() {
  const modal = document.getElementById("image-modal");
  modal.style.display = "none";
}

document.querySelector(".modal .close").onclick = closeModal;

window.onclick = function (event) {
  const modal = document.getElementById("image-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.onload = async function () {
  document.getElementById("search-form").onsubmit = search;
  document.getElementById("search-clear").onclick = clear;
  const initialProducts = await fetchProducts(currentPage, currentSearchQuery);
  renderProducts(initialProducts);
};
