const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const chart = document.querySelector(".cart");

const container = document.querySelector(".container");

const sidebar = document.querySelector("#sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

// images stuff
const mainImage = document.querySelector(".showed-img");
const thumbImage = document.querySelectorAll(".thumb-img");

// images btn
const imgBtn = document.querySelectorAll(".nav-button");

// cart btn
const chartBtn = document.querySelectorAll(".cart-btn");
// cart display qty
const cartDisplayQuantity = document.querySelector(".item-quantity");
const cartItemSize = document.querySelector(".cart-item-size");

// add to cart btn
const addToCartBtn = document.getElementById("add-to-cart");

//cart container
const cartItemsContainer = document.querySelector("#cart-items");
const cartContentsDisplay = document.querySelector(".cart-contents");

chart.addEventListener("click", () => {
  cartItemsContainer.style.display = "block";
});
container.addEventListener("click", () => {
  cartItemsContainer.style.display = "none";
});
menuBtn.addEventListener("click", () => {
  sidebar.style.display = "block";
});
// open sidebar
sidebarLinks.forEach((sidebarLink) =>
  sidebarLink.addEventListener("click", () => {
    sidebar.style.display = "none";
  })
);

// switch images on small with buttons
let index = 0;
imgBtn.forEach((button) => {
  button.addEventListener("click", () => {
    button.alt === "after" ? index++ : index--;
    if (index > 4) index = 1;
    else if (index < 1) index = 4;
    mainImage.setAttribute("src", `/images/image-product-${index}.jpg`);
  });
});
// switch image on large device with thumb nails
thumbImage.forEach((selected) => {
  selected.addEventListener("click", () => {
    mainImage.setAttribute(
      "src",
      `/images/image-product-${selected.dataset.id}.jpg`
    );
    render();
  });
});

// cart actions
let itemQuantity = 0;
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("add");

function render() {
  thumbImage.forEach((selected) => {
    if (
      `/images/image-product-${selected.dataset.id}.jpg` ===
      mainImage.getAttribute("src")
    ) {
      selected.style.border = "2px solid var(--primary-orange)";
      selected.style.opacity = ".5";
    } else {
      selected.style.border = "none";
      selected.style.opacity = "1";
    }
  });
  if (itemQuantity < 1) {
    addToCartBtn.style.opacity = ".65";
    cartItemSize.innerHTML = "";
    cartContentsDisplay.innerHTML = `
    <p class='empty'>
      Shopping cart is empty
    </p>`;
  } else {
    addToCartBtn.style.opacity = "1";
    addToCartBtn.addEventListener("click", () => {
      cartItemSize.innerHTML = itemQuantity;
    });
    cartContentsDisplay.innerHTML = `
    
    <article class="cart-item">
    <img src="/images/image-product-1-thumbnail.jpg" alt="thumb" class="thumb-img">
    <p>
      Fall limited Edition Sneakers <br>
      $125x${itemQuantity}
      <strong>$${125 * itemQuantity}</strong> 
    </p>
    <img src="/images/icon-delete.svg" alt="delete" width="15px" class="delete">
  </article>
  <p class="ckeckout-btn">Checkout</p>
    
    `;
  }
}
//
chartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.dataset.action === "add" ? itemQuantity++ : itemQuantity--;
    if (itemQuantity < 1) minusBtn.style.display = "none";
    else if (itemQuantity > 10) plusBtn.style.display = "none";
    else {
      minusBtn.style.display = "block";
      plusBtn.style.display = "block";
    }
    cartDisplayQuantity.innerHTML = itemQuantity;
    render();
  });
});

render();
