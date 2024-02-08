const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

window.addEventListener("DOMContentLoaded", init);

function init() {
  fetch("https://kea-alt-del.dk/t7/api/products/" + id)
    .then((res) => res.json())
    .then(showProduct);
}

const showProduct = (product) => {
  console.log(product);
  document.querySelector(".purchaseBox h3").textContent = product.productdisplayname;
  document.querySelector(".purchaseBox .brands").textContent = product.brandname;
  document.querySelector(".purchaseBox .articletype").textContent = product.articletype;
  document.querySelector(".productname").textContent = product.productdisplayname;
  document.querySelector(".productcolor").textContent = product.basecolour;
  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
};
