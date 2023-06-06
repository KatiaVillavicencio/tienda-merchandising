//tienda de merchandising//

// 1er paso. Declaro funciones y constantes/variables globales, que se usaran para todas las funciones //
// Constantes globales - Array de Productos

const productos = [
    new Producto(1, "polera", 120, 10, true, "polera.webp"),
    new Producto(2, "tomatodo", 80, 15, false, "tomatodo.webp"),
    new Producto(3, "taza", 40, 30, true, "taza.webp"),
    new Producto(4, "gorra", 50, 20, false, "gorra.webp"),
    new Producto(5, "landyard", 10, 100, true, "landyard.webp")
];

//funcion para los productos//

function Producto(id, nombre, precio, stock, descuento, archivo) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.descuento = descuento
    this.archivo = archivo

};

// funcion para agregar productos

let productosElegidos = [];
const productosElegidosLocalStorage = JSON.parse(localStorage.getItem("productosElegidos"));
if (productosElegidosLocalStorage) {
    productosElegidosLocalStorage.map(objeto => productosElegidos.push((objeto)));
    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
}

let total = 0;

const totalLocalStorage = JSON.parse(localStorage.getItem("total"));
if (totalLocalStorage) {
    localStorage.setItem("total", JSON.stringify(total));
}

function verificarProductoElegido(productoSeleccionadoID) {

    const productoBusqueda = productosElegidos.find(i => i.id == productoSeleccionadoID);

    if (productoBusqueda == undefined) {
        const producto = productos.find(i => i.id == productoSeleccionadoID);
        productosElegidos.push(producto);
        localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
        console.log("Producto Nuevo agregado");
    }
    else {
        alert("Producto ya fue agregado");
    }
};

function plantillaDeProductos(producto) {
    return `
            <div class="col">
                <li>${producto.nombre}</li>
                <div class="card" style="width: 18rem;">
                    <img src="./Img/${producto.archivo}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <span class="card-text">Precio: ${producto.precio}</p>
                    </div>
                </div>
            </div>
            `;
}

function renderizarProductos() {
    const contenedorListaProductos = document.querySelector(".lista-productos");

    // Con la plantilla de productos, creamos un elemento por cada producto de la lista de objetos con el id de producto
    productos.forEach((producto) => {
        const container = document.createElement('div');
        container.classList.add("product-card")
        container.id = `${producto.id}`;
        container.innerHTML = plantillaDeProductos(producto);
        contenedorListaProductos.appendChild(container);
    })

    //agregamos evento de clic para todas las tarjetas de producto
    const listaProductos = document.querySelectorAll(".product-card");
    listaProductos.forEach(producto => producto.addEventListener('click', (e) => agregarProducto(e.currentTarget)));
}

// funcion para sumar el total incluyendo el 20% de dscto. en los productos indicados //

function calcularTotal() {
    const descuento = 0.20;
    total = 0;
    console.log(productosElegidos);
    for (let i = 0; i < productosElegidos.length; i++) {
        if (productosElegidos[i].descuento) {
            const precioConDescuentoFinal = productosElegidos[i].precio - (productosElegidos[i].precio * descuento);
            console.log("precioConDescuentoFinal", precioConDescuentoFinal);
            total += precioConDescuentoFinal;
        } else {
            const precioSinDescuentoFinal = productosElegidos[i].precio;
            console.log("precioSinDescuentoFinal", precioSinDescuentoFinal);
            total += precioSinDescuentoFinal;
        }
    }
    console.log("total", total);
    localStorage.setItem("total", JSON.stringify(total));
    
    return total;
}

function mostrarTotal() {
    const contenedorTotal = document.querySelector(".suma-total");
    contenedorTotal.innerHTML = `${total}`;
}

function agregarProducto(contenedorProducto) {
    const productoId = parseInt(contenedorProducto.id);
    
    verificarProductoElegido(productoId);
    calcularTotal();
    mostrarTotal();
}

/* 2do paso. Llamo a las funciones para que se ejecuten*/

/* let mensajeSaludo = saludo();
console.log("Mensaje de Saludo:", mensajeSaludo); */


renderizarProductos();











