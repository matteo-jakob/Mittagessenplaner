const menuDiv = document.querySelector("#menuContents");
var items;

fetch("http://127.0.0.1:5500/client/getall", {
  method: "GET",
})
  .then((response) => response.json())
  .then((response) => {
    items = response;
  });

var itemsList = items.menuList;
for (let i = 0; i < itemsList.length; i++) {
  menuDiv = `
  <div class="menuCard">
  <div>
    <img src="${itemsList[i].image_url}" alt="">
  </div>
  <div>
    <h3>${itemList[i].item}</h3>
  </div>
  <a>Add to cart</a>
  </div>
    `;
}
