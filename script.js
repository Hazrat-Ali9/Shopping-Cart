// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");

let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let error = document.getElementById("error");
let submit = document.getElementById("submit");

error.style.color = "red";

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    fname.value === "" ||
    lname.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    error.innerText = "Please enter valid filds";
  } else if (password.value === confirmPassword.value) {
    error.innerText = "";
    let users = JSON.parse(localStorage.getItem("user") ?? "[]");
    let filterArr = users.filter((user) => user.email === email.value);
    if (filterArr.length > 0) {
      error.innerText = "Users already exist!";
    } else {
      users.push({
        email: email.value,
        fname: fname.value,
        lname: lname.value,
        password: password.value,
        creatAt: new Date(),
      });
      localStorage.setItem("user", JSON.stringify(users));
      error.style.color = "green";
      error.innerText = "Successfully login!";
      fname.value = "";
      lname.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      window.location.href = "/login.html";
    }
  } else {
    error.innerText = "confirm password is mismatch";
  }
});
