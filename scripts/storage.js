
const saveLocal = () => {
   localStorage.setItem("miCarrito", JSON.stringify(carrito));
};

function recuperarCarrito() {
   return JSON.parse(localStorage.getItem("miCarrito")) || []
}

function eliminarCarrito() { 
   localStorage.removeItem("miCarrito") 
}

const carrito = recuperarCarrito()
