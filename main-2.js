function mostrarTotal() {
    const contenedorProductosSeleccionados = document.querySelector("#productos-seleccionados");
    contenedorProductosSeleccionados.innerHTML = ""; // Limpiar contenido anterior

    productosElegidos.forEach((producto) => {
        const productoSeleccionado = document.createElement("div");
        productoSeleccionado.innerHTML = `
            <span>${producto.nombre}</span>
            <span>Cantidad: ${producto.cantidad}</span>
            <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
        `;
        contenedorProductosSeleccionados.appendChild(productoSeleccionado);
    });

    // Resto del código...
}

function renderizarProductos() {
    // Resto del código...

    const listaProductos = document.querySelectorAll(".product-card");
    listaProductos.forEach((producto) => {
        const botonAgregar = producto.querySelector("button");
        botonAgregar.addEventListener('click', (e) => agregarProducto(e.currentTarget));

        const botonEliminar = producto.querySelector(".eliminar-producto");
        botonEliminar.addEventListener('click', (e) => eliminarProducto(e.currentTarget));
    });
}




function eliminarProducto(botonEliminar) {
    const productoId = parseInt(botonEliminar.getAttribute("data-id"));

    // Encuentra el índice del producto a eliminar en el arreglo de productosElegidos
    const indiceProducto = productosElegidos.findIndex((producto) => producto.id === productoId);

    if (indiceProducto !== -1) {
        const productoEliminado = productosElegidos.splice(indiceProducto, 1)[0];

        // Actualiza el stock y cantidad del producto eliminado
        productoEliminado.stock += productoEliminado.cantidad;
        productoEliminado.cantidad = 0;

        // Actualiza el contenido del contenedor de productos seleccionados y el total
        mostrarTotal();
        calcularTotal();
        localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
        localStorage.setItem("total", JSON.stringify(total));
    }
}

