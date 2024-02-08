const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

fetch(url)
  .then((response) => response.json())
  .then(showProductLists);

function showProductLists(products) {
  console.log(products); // Add this line
  products.forEach(showProductList);
}

function showProductList(product) {
  console.log(product);

  const template = document.querySelector("#smallProductTemplate").content;
  const copy = template.cloneNode(true);

  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".articletype").textContent = product.articletype;
  copy.querySelector(".productname").textContent = product.brandname;
  copy.querySelector(".price").textContent = "DKK " + product.price + ",-";
  copy.querySelector(".price_number").textContent = product.price + ",-";
  copy.querySelector(".discount_price").classList.add("hide");

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  if (product.discount) {
    copy.querySelector(".discount_percentage").classList.remove("hide");
    copy.querySelector(".discount_percentage").textContent = product.discount + "%";
    copy.querySelector(".discount_price").classList.remove("hide");
    copy.querySelector(".price").classList.add("hide");

    // Calculate the new price based on the discount percentage
    const newPrice = product.price * (1 - product.discount / 100);
    // Round the new price to the nearest whole number using Math.round()
    copy.querySelector(".new_price").textContent = Math.round(newPrice);
  } else {
    // If the product is not marked as a discount or a sold out item, remove the 'old_price'-class-properties
    const oldPriceElement = copy.querySelector(".old_price");
    if (oldPriceElement) {
      oldPriceElement.parentNode.removeChild(oldPriceElement);
    }
  }

  copy.querySelector(".read-more").setAttribute("href", `products.html?id=${product.id}`);

  document.querySelector("main").appendChild(copy);
}
