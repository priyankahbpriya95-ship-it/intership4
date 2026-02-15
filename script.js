let cart = [];
let menuOpen = false;

function toggleMenu(){
  document.getElementById("sidebar").style.left =
    menuOpen ? "-220px" : "0";

  menuOpen = !menuOpen;
}

function addToCart(name,price,image){
  let item = cart.find(p=>p.name===name);

  if(item) item.qty++;
  else cart.push({name,price,image,qty:1});

  updateCartCount();
}

function updateCartCount(){
  let count=0;

  cart.forEach(item=>count+=item.qty);

  document.getElementById("cartCount").innerText=count;
}

function goToCart(){
  document.getElementById("shopSection").style.display="none";
  document.getElementById("cartPage").style.display="block";

  displayCartPage();
}

function goBack(){
  document.getElementById("shopSection").style.display="grid";
  document.getElementById("cartPage").style.display="none";
}

function displayCartPage(){
  const container = document.getElementById("cartContainer");
  const totalSpan = document.getElementById("cartTotal");

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div>
        <img src="${item.image}" width="80">
        <p>${item.name}</p>
        <p>₹${item.price}</p>
        <p>Qty: ${item.qty}</p>
      </div>
    `;
  });

  totalSpan.innerText = total;
}

function clearCart(){
  cart = [];

  updateCartCount();
  displayCartPage();
}

function searchProducts(){
  const searchTerm =
    document.getElementById("searchInput").value.toLowerCase();

  const cards = document.getElementsByClassName("card");

  for(let card of cards){
    const productName =
      card.querySelector("p").textContent.toLowerCase();

    card.style.display =
      productName.includes(searchTerm) ? "" : "none";
  }
}

function filterCategory(category){
  const cards = document.getElementsByClassName("card");

  for(let card of cards){
    const cat = card.getAttribute("data-category");

    card.style.display =
      category==="all"||cat===category ? "block" : "none";
  }
}

function loginUser(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user.trim() !== "" && pass.trim() !== ""){
    document.getElementById("loginPage").style.display = "none";
  } else {
    alert("Please enter username and password");
  }
}

/* LOGOUT FUNCTION ADDED */
function logoutUser(){

  document.getElementById("loginPage").style.display = "flex";

  document.getElementById("shopSection").style.display = "grid";
  document.getElementById("cartPage").style.display = "none";

}
