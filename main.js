// tienda de merchandising//

// 1er paso. Declaro funciones y constantes/variables globales, que se usaran para todas las funciones //

// Constantes globales - Array de Productos

let productos = [];
let productosElegidos = [];

const productosElegidosLocalStorage = JSON.parse(
  localStorage.getItem("productosElegidos")
);

if (productosElegidosLocalStorage) {
  productosElegidosLocalStorage.map((objeto) => productosElegidos.push(objeto));

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
  const contenedorStock = document.querySelector(
    `[id='${productoSeleccionadoID}'] .card-stock`
  );
  const productoExistente = productosElegidos.find(
    (i) => i.id == productoSeleccionadoID
  );

  if (
    contenedorStock.innerHTML <= 0 ||
    (productoExistente && productoExistente.stock <= 0)
  ) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "¡Ya se agotó este producto!",
      showConfirmButton: false,
      timer: 1000,
    });
    return;
  }

  const producto =
    productoExistente || productos.find((i) => i.id == productoSeleccionadoID);

  producto.cantidad++;
  producto.stock--;
  contenedorStock.innerHTML = `${producto.stock}`;

  if (!productoExistente) {
    productosElegidos.push(producto);
  }

  localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado",
    showConfirmButton: false,
    timer: 1000,
  });

  const numeroProductosSeleccionados = productosElegidos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
  console.log(
    "Número de productos seleccionados:",
    numeroProductosSeleccionados
  );
}

numeroProductosSeleccionados = document.querySelector("#producto-carrito");

function plantillaDeProductos(producto) {
  return `
            
                <span class="card-title">${producto.nombre}</span>
                <div class="card  text-center" style="width: 18rem;">
                    <img src="./Img/${
                      producto.archivo
                    }" class="card-img-top" alt="...">
                    <div class="card-body">
                        <span class="card-text"> Precio:S/. ${
                          producto.precio
                        }</span><br>
                        <span> Stock: <span class="card-stock"> ${
                          producto.stock
                        } </span > unidades </span> <br>
                        <span> ${
                          producto.descuento ? "Descuento 20%" : "Precio normal"
                        } </span> <br>
                        <button> Agregar al carrito </button>
                    </div>
                </div>
            `;
}

async function llamarProductos() {
  const respuesta = await fetch("./json/productos.json");
  const data = await respuesta.json();
  data.forEach((producto) => {
    // Verificar si el producto está en el carrito y actualizar el stock
    const productoExistente = productosElegidos.find(
      (i) => i.id === producto.id
    );
    if (productoExistente) {
      producto.stock = productoExistente.stock;
    }
    productos.push(producto);
  });
  return productos;
}

function renderizarProductos() {
  const contenedorListaProductos = document.querySelector(
    ".lista-productos .row"
  );

  // Con la plantilla de productos, creamos un elemento por cada producto de la lista de objetos con el id de producto
  productos.forEach((producto) => {
    const container = document.createElement("div");
    container.classList.add("col");
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.id = `${producto.id}`;
    card.innerHTML = plantillaDeProductos(producto);
    container.appendChild(card);
    contenedorListaProductos.appendChild(container);
  });

  //agregamos evento de clic para todas las tarjetas de producto
  const listaProductos = document.querySelectorAll(".product-card");
  listaProductos.forEach((producto) =>
    producto.addEventListener("click", (e) => agregarProducto(e.currentTarget))
  );
}

// funcion para sumar el total incluyendo el 20% de dscto. en los productos indicados //

function calcularTotal() {
  const descuento = 0.2;
  total = 0;
  for (let i = 0; i < productosElegidos.length; i++) {
    if (productosElegidos[i].descuento) {
      // Se multiplica el precio individual por la cantidad de productos seleccionados
      console.log(productosElegidos[i]);
      const precioConDescuentoFinal =
        (productosElegidos[i].precio -
          productosElegidos[i].precio * descuento) *
        productosElegidos[i].cantidad;
      total += precioConDescuentoFinal;
    } else {
      const precioSinDescuentoFinal =
        productosElegidos[i].precio * productosElegidos[i].cantidad;
      total += precioSinDescuentoFinal;
    }
  }
  localStorage.setItem("total", JSON.stringify(total));
  return total;
}

function mostrarTotal() {
  const contenedorProductosSeleccionados = document.querySelector(
    "#productos-seleccionados"
  );
  contenedorProductosSeleccionados.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const productoSeleccionado = document.createElement("div");
    productoSeleccionado.innerHTML = `
            <span>${producto.nombre}</span>
            <span>Cantidad: ${producto.cantidad}</span>
        `;
    contenedorProductosSeleccionados.appendChild(productoSeleccionado);
  });

  const numeroProductos = productosElegidos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
  const contenedorNumeroProductos = document.querySelector("#numero-productos");
  contenedorNumeroProductos.innerHTML = numeroProductos;

  const contenedorTotal = document.querySelector("#suma-total");
  contenedorTotal.innerHTML = total;
}

function agregarProducto(contenedorProducto) {
  const productoId = parseInt(contenedorProducto.id);

  verificarProductoElegido(productoId);
  calcularTotal();
  mostrarTotal();
}

/* 2do paso. Llamo a las funciones para que se ejecuten*/

llamarProductos();
setTimeout(() => renderizarProductos(), 700);
mostrarTotal();
