const submitBtn = document.getElementById("submit-btn");
const loginSt = document.getElementById("login-st");

fetch("/login", {
  method: "POST",
  body: JSON.stringify({ username, password }),
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      loginSt.innerHTML = data.message;
    } else {
      console.log("Error:", response.statusText);
    }
  })
  .catch((error) => {
    console.error(error);
  });
