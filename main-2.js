// 1er paso. Declaro funciones y constantes/variables globales, que se usarán para todas las funciones //

// Constantes globales - Array de Productos

let productos = [];
let productosElegidos = [];

const productosElegidosLocalStorage = JSON.parse(localStorage.getItem("productosElegidos"));

if (productosElegidosLocalStorage) {
    productosElegidosLocalStorage.map(objeto => productosElegidos.push(objeto));

    // Eliminamos productos repetidos del Carrito
    const productosOrdenados = productosElegidos.filter((item, index) => {
        return productosElegidos.indexOf(item) === index;
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
    const productoExistente = productosElegidos.find(i => i.id == productoSeleccionadoID);
    const contenedorStock = document.querySelector(`[id='${productoSeleccionadoID}'] .card-stock`);
    
    if (contenedorStock.innerHTML <= 0) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¡Ya se agotó este producto!',
            showConfirmButton: false,
            timer: 1000
        });
        return;
    }

    // El producto elegido ya existe
    if (productoExistente) {
        productoExistente.cantidad++;
        productoExistente.stock--;
        contenedorStock.innerHTML = `${productoExistente.stock}`;
    } else {
        // El producto elegido no existe
        const productoNuevo = productos.find(i => i.id == productoSeleccionadoID);
        
        if (productoNuevo.stock <= 0) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Ya se agotó este producto!',
                showConfirmButton: false,
                timer: 1000
            });
            return;
        }
        
        productoNuevo.cantidad++;
        productoNuevo.stock--;
        contenedorStock.innerHTML = `${productoNuevo.stock}`;
        productosElegidos.push(productoNuevo);
    }

    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
    
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

numeroProductosSeleccionados = document.querySelector("#producto-carrito");


