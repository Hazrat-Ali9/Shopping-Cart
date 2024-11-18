// Write your script here
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let oldPassword = document.getElementById("oldPass");
let newPassword = document.getElementById("newPass");
let confPass = document.getElementById("confPass");
let save_error = document.getElementById("save_error");
let edit_error = document.getElementById("edit_error");

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
  // current user first and last name update
  document.getElementById("save_info").addEventListener("click", () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let updatedUser = {
      ...currentUser,
      fname: fname.value,
      lname: lname.value,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    save_error.style.color = "green";
    save_error.innerText = "Successfully Updated!";
    fname.value = "";
    lname.value = "";
    setTimeout(() => {
      save_error.innerText = "";
    }, 2000);
  });

  // Edit Password
  document.getElementById("changePass").addEventListener("click", () => {
    if (currentUser?.password ?? "") {
      if (newPassword.value === confPass.value) {
        //update password in current user
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let updatedUser = {
          ...currentUser,
          password: newPassword.value,
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        //update password in current user
        let users = JSON.parse(localStorage.getItem("user"));

        let updated = users.map((user) => {
          if (user.email === currentUser.email) {
            return {
              ...user,
              password: newPassword.value,
            };
          } else {
            return user;
          }
        });
        localStorage.setItem("user", JSON.stringify(updated));
      } else {
        // mismatched password
        edit_error.style.color = "red";
        edit_error.innerText = "new password and confirm password should match";
      }
    }
  });
  // logout the user
  document.getElementById("logout").addEventListener("click", () => {
    return (window.location.href = "/login.html");
  });
} else {
  window.location.href = "/login.html";
}
