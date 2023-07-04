// Constantes globales - Array de Productos
let productos = [];
let productosElegidos = [];

const productosElegidosLocalStorage = JSON.parse(localStorage.getItem("productosElegidos"));

if (productosElegidosLocalStorage) {
    productosElegidosLocalStorage.map(objeto => productosElegidos.push(objeto));

    // Eliminamos productos repetidos del Carrito
    const productosOrdenados = productosElegidos.filter((item, index) => {
        return productosElegidos.findIndex(obj => obj.id === item.id) === index;
    });
    
    // Agregamos productos sin repetir al Carrito
    productosElegidos = productosOrdenados;
    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
}

let total = 0;

const totalLocalStorage = JSON.parse(localStorage.getItem("total"));
if (totalLocalStorage) {
    total = totalLocalStorage;
    localStorage.setItem("total", JSON.stringify(total));
}

function verificarProductoElegido(productoSeleccionadoID) {
    /* buscar el ID seleccionado en productos elegidos */
    const productoExistente = productosElegidos.find(i => i.id === productoSeleccionadoID);
    const contenedorStock = document.querySelector(`[id='${productoSeleccionadoID}'] .card-stock`);
  
    // El producto elegido ya existe
    if (productoExistente) {
        productoExistente.cantidad++;
        productoExistente.stock--;
        contenedorStock.innerHTML = `${productoExistente.stock}`;
    } else {
        // El producto elegido no existe
        const productoNuevo = productos.find(i => i.id === productoSeleccionadoID);
        productoNuevo.cantidad++;
        productoNuevo.stock--;
        contenedorStock.innerHTML = `${productoNuevo.stock}`;
        productosElegidos.push(productoNuevo);
    }
  
    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
    // librería sweet alert
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1000
    });

    // Imprimir el número de productos seleccionados
    const numeroProductosSeleccionados = productosElegidos.reduce((total, producto) => total + producto.cantidad, 0);
    console.log("Número de productos seleccionados:", numeroProductosSeleccionados);
}

function plantillaDeProductos(producto) {
    return `
        <span class="card-title">${producto.nombre}</span>
        <div class="card text-center" style="width: 18rem;">
            <img src="./Img/${producto.archivo}" class="card-img-top" alt="...">
            <div class="card-body">
                <span class="card-text"> Precio: S/. ${producto.precio}</span><br>
                <span> Stock: <span class="card-stock">${producto.stock} </span > unidades </span> <br>
                <span> ${producto.descuento ? "Descuento 20%" : "Precio normal"} </span> <br>
                <button> Agregar al carrito </button>
            </div>
        </div>
    `;
}

async function llamarProductos() {
    const respuesta = await fetch('./json/productos.json');
    const data = await respuesta.json();
    data.forEach(producto => { productos.push(producto) });
    return productos;
}

function renderizarProductos() {
    const contenedorListaProductos = document.querySelector(".lista-productos .row");

