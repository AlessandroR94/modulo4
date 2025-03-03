const postName = document.getElementById("post-name")
const postDescription = document.getElementById("post-description")
const postBrand = document.getElementById("post-brand")
const postImg = document.getElementById("post-image")
const postPrice = document.getElementById("post-price")
const alertMsg= document.getElementById("messageAlert")

async function addProduct() {

    if (postName.value && postDescription.value && postBrand.value && postImg.value && postPrice.value) {
        try {
            const newProd = {
                name: postName.value,
                description: postDescription.value,
                brand: postBrand.value,
                imageUrl: postImg.value,
                price: parseFloat(postPrice.value),
            }
            const response = await fetch(productsList, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmM2JhOWM5MWUzNDAwMTVlMTEyYmQiLCJpYXQiOjE3NDA2NjA1MzUsImV4cCI6MTc0MTg3MDEzNX0.sxW31y0UAwH9V59cZkNGwsoY2Npe_SMdN4HJFMoV9A8',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(newProd),
            });

            postName.value = "";
            postDescription.value = "";
            postBrand.value = "";
            postImg.value = "";
            postPrice.value = "";

            
         getProducts();
        } catch (error) {
            console.log(error);
        }
    } else {
        alertMsg.classList.remove('d-none');
    }

    setTimeout(() => {
        alertMsg.classList.add('d-none');
    }, 5000);

}

