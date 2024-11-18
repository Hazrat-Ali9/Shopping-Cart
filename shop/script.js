let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let COLORS = ["red", "green", "yellow", "blue", "gray", "orange"];
let SIZES = ["sm", "md", "lg", "XL", "XXL"];

if (currentUser) {
  if (localStorage.getItem("products")) {
    let products = JSON.parse(localStorage.getItem("products"));
    let result = products;

    document.getElementById("all").addEventListener("click", () => {
      randerElement(products);
      handleToggle("all");
    });
    document.getElementById("men").addEventListener("click", () => {
      result = products.filter(
        (product) => product.category === "men's clothing"
      );
      randerElement(result);
      handleToggle("men");
    });
    document.getElementById("women").addEventListener("click", () => {
      result = products.filter(
        (product) => product.category === "women's clothing"
      );
      randerElement(result);
      handleToggle("women");
    });
    document.getElementById("jewellery").addEventListener("click", () => {
      result = products.filter((product) => product.category === "jewelery");
      randerElement(result);
      handleToggle("jewellery");
    });
    document.getElementById("electronics").addEventListener("click", () => {
      result = products.filter((product) => product.category === "electronics");
      randerElement(result);
      handleToggle("electronics");
    });
    randerElement(products);

    // add to cart list
    function handleCartAdd(id) {
      let cartItem = JSON.parse(localStorage.getItem("cart") ?? "[]");
      let res = result.filter((product) => product.id === id);
      if (cartItem) {
        let newData = [...cartItem, ...res];
        localStorage.setItem("cart", JSON.stringify(newData));
      } else {
        let newData = [...res];
        localStorage.setItem("cart", JSON.stringify(newData));
      }
    }
  } else {
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((res) => {
        let newUsers = res?.map((user) => {
          return {
            ...user,
            colors: COLORS.slice(Math.floor(Math.random() * COLORS.length)),
            sizes: SIZES.slice(Math.floor(Math.random() * SIZES.length)),
          };
        });
        localStorage.setItem("products", JSON.stringify(newUsers));
      });
  }
} else {
  //login
}
function myFunction() {
  let products = JSON.parse(localStorage.getItem("products"));
  let searchVal = document.getElementById("search");
  let result = products.filter((val) =>
    val.title.toLowerCase().includes(searchVal.value.toLowerCase())
  );

  randerElement(result);
}

function randerElement(data) {
  let box = document.getElementById("box");
  box.innerHTML = data.map((item) => {
    return ` <div class="item">
        <img src=${item.image} class="img" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">${item.price}$</div>
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
          <div class="row">Rating:${item?.rating?.rate ?? 0}</div>
        </div>
        <button id="addBtn" onclick="handleCartAdd(${
          item.id
        })" >Add to Cart</button>
      </div>`;
  });
}
function handleToggle(type) {
  if (type === "electronics") {
    document.getElementById("electronics").classList.add("active");

    document.getElementById("jewellery").classList.remove("active");
    document.getElementById("women").classList.remove("active");
    document.getElementById("men").classList.remove("active");
    document.getElementById("all").classList.remove("active");
  } else if (type === "jewellery") {
    document.getElementById("jewellery").classList.add("active");

    document.getElementById("electronics").classList.remove("active");
    document.getElementById("women").classList.remove("active");
    document.getElementById("men").classList.remove("active");
    document.getElementById("all").classList.remove("active");
    document.getElementById("all").classList.remove("active");
  } else if (type === "women") {
    document.getElementById("women").classList.add("active");

    document.getElementById("electronics").classList.remove("active");
    document.getElementById("jewellery").classList.remove("active");
    document.getElementById("men").classList.remove("active");
    document.getElementById("all").classList.remove("active");
  } else if (type === "men") {
    document.getElementById("men").classList.add("active");

    document.getElementById("electronics").classList.remove("active");
    document.getElementById("jewellery").classList.remove("active");
    document.getElementById("women").classList.remove("active");
    document.getElementById("all").classList.remove("active");
  } else if (type === "all") {
    document.getElementById("all").classList.add("active");
    document.getElementById("men").classList.remove("active");

    document.getElementById("electronics").classList.remove("active");
    document.getElementById("jewellery").classList.remove("active");
    document.getElementById("women").classList.remove("active");
  }
}
handleToggle();
