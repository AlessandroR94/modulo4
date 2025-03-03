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
                throw new Error(`Errore nel recupero dei dettagli del prodotto. Status: ${res.status}`);
            }
            const product = await res.json();

            // Popolazione dei campi del modulo con i dati del prodotto
            document.getElementById('edit-name').value = product.name || '';
            document.getElementById('edit-description').value = product.description || '';
            document.getElementById('edit-brand').value = product.brand || '';
            document.getElementById('edit-image').value = product.imageUrl || '';
            document.getElementById('edit-price').value = product.price || '';
        } catch (error) {
            console.log("Errore durante il recupero dei dettagli del prodotto:", error.message);
        }
    }

    // Chiamata alla funzione getProductDetails subito dopo il caricamento della pagina
    getProductDetails();

    // Gestione dell'invio del modulo per aggiornare il prodotto
    document.getElementById('edit-form').addEventListener('submit', async (event) => {
        event.preventDefault();
         
        const updatedProduct = {
            name: document.getElementById('edit-name').value,
            description: document.getElementById('edit-description').value,
            brand: document.getElementById('edit-brand').value,
            imageUrl: document.getElementById('edit-image').value,
            price: parseFloat(document.getElementById('edit-price').value),
        };

        try {
            await fetch(`${productsList}${productId}`, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmM2JhOWM5MWUzNDAwMTVlMTEyYmQiLCJpYXQiOjE3NDA1ODcxNzIsImV4cCI6MTc0MTc5Njc3Mn0.yLEAVs7YQfCNboyHCrmjgAr0HC8xLueff5l6AzzWsNM',
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(updatedProduct),
            });
            window.location.href = 'backoffice.html'; // Reindirizza alla pagina principale dopo aver salvato le modifiche
        } catch (error) {
            console.log("Errore durante l'aggiornamento del prodotto:", error.message);
        }
    });
});
