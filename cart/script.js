let cartItems = JSON.parse(localStorage.getItem("cart"));
let cart_box = document.getElementById("cart");
let billing_items = document.getElementById("billing_items");

console.log(cartItems);
if (cartItems) {
  console.log("called");
  renderElement(cartItems);
  // billing information
  billingRender(cartItems);
  //Total shipping
}

function handleRemoveCart(id) {
  let data = JSON.parse(localStorage.getItem("cart"));
  let res = data.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(res));

  renderElement(res);
  billingRender(res);
}

function renderElement(data) {
  console.log(data);
  cart_box.innerHTML = data.map((product) => {
    return `
        <div class="item">
        <img src=${product.image} class="img" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">${product.price} $</div>
            <div class="sized">S,M,L</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              <div class="circle" style="background-color: #000"></div>
              <div class="circle" style="background-color: #4938af"></div>
              <div class="circle" style="background-color: #203d3e"></div>
            </div>
          </div>
          <div class="row">Rating:</div>
        </div>
        <button id="addBtn" onclick="handleRemoveCart(${product.id})" >Remove to Cart</button>
      </div>
        `;
  });
}

function billingRender(data) {
  billing_items.innerHTML = data.map((val) => {
    return `
    <div class="items_Card">
      <div class="item_name ">
        <span>1</span>
        <span>${
          val.title.length > 20 ? `${val.title.slice(0, 15)}...` : val.title
        }</span>
      </div>
      <p class="price">${val.price} $</p>
  </div>
    `;
  });

  document.getElementById("total").innerText = data.reduce(
    (acc, val) => acc + val.price,
    0
  );
}

document.getElementById("payment").addEventListener("click", () => {
  window.location.href = "/razorpay/index.html";
});
