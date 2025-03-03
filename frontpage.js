const productsList = "https://striveschool-api.herokuapp.com/api/product/";
const productContainer = document.getElementById('productContainer');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

let products = [];

async function getProducts() {
    try {
        const res = await fetch(productsList, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmM2JhOWM5MWUzNDAwMTVlMTEyYmQiLCJpYXQiOjE3NDA1ODcxNzIsImV4cCI6MTc0MTc5Njc3Mn0.yLEAVs7YQfCNboyHCrmjgAr0HC8xLueff5l6AzzWsNM'
            }
        });
        const json = await res.json();
        products = json;
        renderProducts(products);
    } catch (error) {
        console.log(error);
    }
}

function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function createProductCard({ _id, name, description, brand, price, imageUrl }) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3", "mb-4");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "h-100", "d-flex", "flex-column");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("card-img-top", "photo");
    img.alt = name;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "flex-grow-1");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = name;
    cardTitle.addEventListener('click', () => {
        window.location.href = `dettaglio.html?id=${_id}`;
    });

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = `${description} - ${brand}`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "mt-auto", "d-flex", "flex-column", "align-items-center");

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text", "fw-bold", "mb-2");
    cardPrice.innerText = `${price} €`;

    const cardCarrello = document.createElement("button");
    cardCarrello.classList.add("btn", "btn-primary", "add-to-cart");
    cardCarrello.innerText = 'Aggiungi al carrello';
    cardCarrello.setAttribute('data-product-id', _id);

    cardFooter.append(cardPrice, cardCarrello);
    cardBody.append(cardTitle, cardText);
    cardDiv.append(img, cardBody, cardFooter);
    colDiv.appendChild(cardDiv);

    return colDiv;
}



getProducts();

function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    const productCard = button.closest('.card');
    const productName = productCard.querySelector('.card-title').innerText;
    const productPrice = productCard.querySelector('.fw-bold').innerText.replace(' €', '');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function search() {
    const searchValue = searchInput.value.toLowerCase();

    if (searchValue === '') {
        renderProducts(products);
    } else {
        const filteredProducts = products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchValue) ||
                product.description.toLowerCase().includes(searchValue) ||
                product.brand.toLowerCase().includes(searchValue)
            );
        });

        renderProducts(filteredProducts);
    }
}

searchButton.addEventListener('click', search);
searchInput.addEventListener('input', search);
