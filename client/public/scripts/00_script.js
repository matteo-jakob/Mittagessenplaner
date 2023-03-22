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
  });
