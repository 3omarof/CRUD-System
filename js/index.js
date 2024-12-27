var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var productSearchInput = document.getElementById("productSearch");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productList = [];

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProducts(productList);
}
function addProduct() {  
  if (validation('productPrice') && validation('productName') && validation('productCategory') && validation('productDescription') && validation('productImage')) {
      var product = {
          name: productNameInput.value,
          price: productPriceInput.value,
          category: productCategoryInput.value,
          description: productDescriptionInput.value,
          img: (productImageInput.files.length > 0) ? `imgs/${productImageInput.files[0].name}` : "imgs/504708-200.png"
      };
      productList.push(product);
      localStorage.setItem("products", JSON.stringify(productList));
      clearInputs();
      displayProducts(productList);
    } else {
      errorMessage();
  }
}
function displayProducts(arr) {
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    cartona += `
      <div class="col-md-2">
        <div class="card">
          <div class="card-body">
            <img src="${productList[i].img}" class="w-75" alt="product image">
            <h2 class="h3">${productList[i].name}</h2>
            <p>${productList[i].description}</p>
            <h3 class="h5"><span class="fw-bold">Price:</span> ${productList[i].price}</h3>
            <h3 class="h5"><span class="fw-bold">Category:</span> ${productList[i].category}</h3>
            <button class="btn btn-outline-danger deleteBtn" onclick="deleteProducts(${i})">Delete</button>
            <button class="btn btn-outline-warning updateBtn" onclick="setValueInputs(${i})">Update</button>
          </div>
        </div>
      </div>`;
  }
  document.getElementById("colsOfRow").innerHTML = cartona;
}

function deleteProducts(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts(productList);
}

function search() {
  var term = productSearchInput.value.toLowerCase();
  var searchArray=[];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term))
    {
      searchArray.push(productList[i]);
      displayProducts(searchArray);
    }
  }
}

var updateIndex;
function setValueInputs(index) {
  updateIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
function updateProducts() {
  if (validation('productPrice') && validation('productName') && validation('productCategory') && validation('productDescription') && validation('productImage')) {

  productList[updateIndex].name = productNameInput.value;
  productList[updateIndex].price = productPriceInput.value;
  productList[updateIndex].category = productCategoryInput.value;
  productList[updateIndex].description = productDescriptionInput.value;
  productList[updateIndex].img =(productImageInput.files[0]) ? `imgs/${productImageInput.files[0].name}` : "imgs/504708-200.png"

  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts(productList);
  clearInputs();
  
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}else{
  errorMessage();
}
}
function validation(inputID) {
  var regex = {
    productName: /^[\w ]{4,20}$/, 
    productPrice: /^[1-9][0-9]{1,5}$/, 
    productCategory: /^(tv|mobile|screens|electronics)$/i,
    productImage: /^.+\.(png|jpg|jpeg)$/i, 
    productDescription: /^.{10,200}$/m 
  };

  var myString = document.getElementById(inputID).value.trim();

  if (inputID == "productImage") {
    myString = document.getElementById(inputID).files[0]?.name;
  }

  if (regex[inputID].test(myString)) {
    document.getElementById(inputID).classList.add("is-valid");
    document.getElementById(inputID).classList.remove("is-invalid");
    document.getElementById(`parValid${inputID}`).classList.remove("d-none");  
    document.getElementById(`parInvalid${inputID}`).classList.add("d-none");  
    return true; 
  } else {
    document.getElementById(inputID).classList.remove("is-valid");
    document.getElementById(inputID).classList.add("is-invalid");
    document.getElementById(`parInvalid${inputID}`).classList.remove("d-none"); 
    document.getElementById(`parValid${inputID}`).classList.add("d-none");      
    return false;
  }
}
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productImageInput.value = ""; 
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
  document.getElementById("parValidproductName").classList.add("d-none");
  document.getElementById("parValidproductPrice").classList.add("d-none");
  document.getElementById("parValidproductImage").classList.add("d-none");
  document.getElementById("parValidproductDescription").classList.add("d-none");
  document.getElementById("parValidproductCategory").classList.add("d-none");

}
function errorMessage(){
  Swal.fire({
    title: "Make Sure All Inputs Are Valid?",
    icon: "error",
    className:"error-message"
  });
}


