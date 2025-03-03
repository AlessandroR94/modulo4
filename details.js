document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productsList = "https://striveschool-api.herokuapp.com/api/product/";

    // Funzione per ottenere i dettagli del prodotto
    async function getProductDetails() {
        if (!productId) {
            return;
        }

        const apiUrl = `${productsList}${productId}`;

        try {
            const res = await fetch(apiUrl, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmM2JhOWM5MWUzNDAwMTVlMTEyYmQiLCJpYXQiOjE3NDA1ODcxNzIsImV4cCI6MTc0MTc5Njc3Mn0.yLEAVs7YQfCNboyHCrmjgAr0HC8xLueff5l6AzzWsNM'
                }
            });
            if (!res.ok) {
                throw new Error(`Non è stato trovato nessun prodotto. Status: ${res.status}`);
            }
            const product = await res.json();

            // Dettagli del prodotto
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-description').innerText = product.description;
            document.getElementById('product-brand').innerText = `Brand: ${product.brand}`;
            document.getElementById('product-image').src = product.imageUrl;
            document.getElementById('product-price').innerText = `Price: ${product.price} €`;
        } catch (error) {
            console.log("Non è stato trovato nessun prodotto:", error.message);
        }
    }

    // Chiamata alla funzione getProductDetails subito dopo il caricamento della pagina
    getProductDetails();
});
