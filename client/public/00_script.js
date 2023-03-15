const menuDiv = document.querySelector("#menuContents");
var items;
fetch("/getall", {
  method: "GET",
})
  .then((response) => response.json())
  .then((response) => {
    items = response;
    console.log(items);
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
