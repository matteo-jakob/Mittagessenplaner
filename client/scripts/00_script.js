const submitBtn = document.getElementById("submit-btn");
const loginSt = document.querySelector(".loginStatus");

const username = document.querySelector("#username").value;
const password = document.querySelector("#password").value;

fetch("/login", {
  method: "POST",
  body: JSON.stringify({ username, password }),
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      loginSt.innerHTML = data.message;
      alert("Login Status: " + data.status + "\n" + data.message);
      console.log("reloading page...");
      location.reload(); // reload the current page
    } else {
      console.error("Error:", response.statusText);
      alert("Login Status: " + data.status);
    }
  })
  .catch((error) => {
    console.error(error);
  });
