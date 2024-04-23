const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')


const URL = 'productos.json'

const productsList = document.querySelector('.container-items');

const getProducts = async () => {
    const response = await fetch("productos.json");
    const data = await response.json();

    data.forEach((product) => {
        const item = document.createElement('div');
        item.classList.add('item');

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = product.img; 
        img.alt = product.nombre;
        figure.appendChild(img);

        const infoProduct = document.createElement('div');
        infoProduct.classList.add('info-product');
        const productName = document.createElement('h2');
        productName.textContent = product.nombre;
        const productPrice = document.createElement('p');
        productPrice.classList.add('price');
        productPrice.textContent = `$${product.price}`;
        const btnAddCart = document.createElement('button');
        btnAddCart.classList.add('btn-add-cart');
        btnAddCart.textContent = 'Añadir al carrito';
        infoProduct.appendChild(productName);
        infoProduct.appendChild(productPrice);
        infoProduct.appendChild(btnAddCart);

        item.appendChild(figure);
        item.appendChild(infoProduct);

        productsList.appendChild(item);
    });
};

getProducts();

//set item

function cargarProductos() {
if (allProducts.length > 0) {
    getProducts();
} else {
    console.log("El carrito está vacío.");
}
}

//variable de arreglos de Productos
let allProducts = []

const totalPagar = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')

productsList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        }

        const exits = allProducts.some(product => product.title === infoProduct.title)

        if (exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                    } else {
                    return product
                }
            })
            allProducts = [...allProducts]
        } else {
              allProducts = [...allProducts, infoProduct];
        }

      

        showHTML();
    }
});
// Evento click para eliminar productos del carrito
rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        showHTML();
    }
});


// Función para mostrar el carrito
const showHTML = () => {
    if (!allProducts.length) {
        console.log("El carrito está vacío.");
        return;
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${parseInt(product.price.slice(1)) * parseInt(product.quantity)}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.appendChild(containerProduct);

        total += parseInt(product.price.slice(1)) * parseInt(product.quantity);
        totalOfProducts += parseInt(product.quantity);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Producto agregado al carrito',
            text: `${product.title} ha sido agregado al carrito.`,
            showConfirmButton: false,
            timer: 1500
          });

    });

    totalPagar.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

    const purchaseButton = document.querySelector('.purchase-button');
    if (!purchaseButton && allProducts.length > 0) {
        const purchaseButton = document.createElement('button');
        purchaseButton.classList.add('purchase-button');
        purchaseButton.textContent = 'REALIZAR COMPRA';
        containerCartProducts.appendChild(purchaseButton);

        purchaseButton.addEventListener('click', () => {
            console.log('Compra realizada para todos los productos del carrito.');
        });
    } else if (purchaseButton && allProducts.length === 0) {
        purchaseButton.remove();
    }
};

showHTML();

cargarProductos();