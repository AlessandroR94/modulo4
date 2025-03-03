const productsList = "https://striveschool-api.herokuapp.com/api/product/";
const resultsProd = document.getElementById('resultsProd');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

let posts = []

async function getProducts() {
    try {
        const res = await fetch(productsList, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmM2JhOWM5MWUzNDAwMTVlMTEyYmQiLCJpYXQiOjE3NDA1ODcxNzIsImV4cCI6MTc0MTc5Njc3Mn0.yLEAVs7YQfCNboyHCrmjgAr0HC8xLueff5l6AzzWsNM'
            }
        });
        const json = await res.json();
        posts = json;
        renderProducts(json);
    } catch (error) {
        console.log(error);
    }
}

function renderProducts(posts) {
    resultsProd.innerHTML = "";
    const postNodes = posts.map(post => createRow(post))
    resultsProd.append(...postNodes)
}

function createRow({ name, description, brand, price, _id }) {
    const tableRow = document.createElement("tr");

    const cellName = createTd(name);
    const cellDescription = createTd(description);
    const cellBrand = createTd(brand);
    const cellPrice = createTd(price);
    const cellActions = createTd('');

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("btn", "btn-primary", "me-2");
    editButton.addEventListener("click", () => {
        window.location.href = `edit.html?id=${_id}`;
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", async () => {
        if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
            try {
                await fetch(`${productsList}${_id}`, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmM2JhOWM5MWUzNDAwMTVlMTEyYmQiLCJpYXQiOjE3NDA1ODcxNzIsImV4cCI6MTc0MTc5Njc3Mn0.yLEAVs7YQfCNboyHCrmjgAr0HC8xLueff5l6AzzWsNM'
                    },
                    method: 'DELETE',
                });
                getProducts(); // Aggiorna la lista dei prodotti dopo la cancellazione
            } catch (error) {
                console.log(error);
            }
        }
    });

    cellActions.append(editButton, deleteButton);

    tableRow.append(cellName, cellDescription, cellBrand, cellPrice, cellActions);
    return tableRow;
}

function createTd(text) {
    const myCell = document.createElement("td");
    myCell.innerText = text;

    return myCell;
}

getProducts();

function search() {
    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = posts.filter(post => {
        if (
            post.name.toLowerCase().includes(searchValue) ||
            post.description.toLowerCase().includes(searchValue) ||
            post.brand.toLowerCase().includes(searchValue)
        ) {
            return true;
        }

        return false;
    })

    renderProducts(filteredProducts)
}

searchButton.addEventListener('click', search);
