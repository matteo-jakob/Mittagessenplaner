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

/* fetch("/login", {
  method: "POST",
  body: JSON.stringify({ username, password }),
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      loginSt.innerHTML = data.message;
      alert("Login Status: " + data.status + "\n" + data.message);
    } else {
      console.error("Error:", data.statusText);
      alert("Login Status: " + data.status);
    }
  })
  .catch((error) => {
    console.error(error);
  });
 */
var menuDiv = document.getElementById("menuContents");
var items;
fetch("/getall", {
  method: "GET",
})
  .then((response) => response.json())
  .then((response) => {
    items = response;
    var itemsList = items.menuList;
    console.log(itemsList);
    for (let i = 0; i < itemsList.length; i++) {
      menuDiv.innerHTML += `
  <div class="menuCard">
  <div>
    <img src="${itemsList[i].image_url}" alt="">
  </div>
  <div>
    <h3>${itemsList[i].item}</h3>
  </div>
  <a>Add to cart</a>
  </div>
    `;
      console.log("Added Item " + itemsList[i].item);
    }
  });
