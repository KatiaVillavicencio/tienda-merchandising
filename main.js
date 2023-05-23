
//tienda de merchandising//

// 1er paso. Declaro funciones y constantes/variables globales, que se usaran para todas las funciones //
// Constantes globales - Array de Productos

const productos = [
    new Producto(1, "polera", 120, 10, true),
    new Producto(2, "tomatodo", 80, 15, false),
    new Producto(3, "taza", 40, 30, true),
    new Producto(4, "gorra", 50, 20, false),
    new Producto(5, "llavero", 10, 100, true)
];

//Funciones://

function saludo() {
    let nombrePersona = prompt("Por favor, ingrese su nombre:");
    if (nombrePersona != null) {
        const saludo = "¡Hola " + nombrePersona + " Bienvenid@ a nuestra tienda!";
        alert(saludo);
        return saludo;
    }
    else {
        const saludo = "¡Hola, bienvenid@ a nuestra tienda!";
        alert(saludo);
        return saludo;
    }
};

//funcion para los productos//

function Producto(id, nombre, precio, stock, descuento) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.descuento = descuento

};

// funcion para imprimir anuncio
/*function imprimirAnuncio() {
    console.log(`Aprovecha el 20% de descuento en tu ${this.nombre}, disponible ${this.stock} unidades`);
    return this.precio;
}*/


//funcion para mostrar y elegir un producto x ID//

function mostrarProducto() {

    let seleccion = prompt("Escriba el numero del producto deseado: 1.Polera // 2.Tomatodo // 3.Taza // 4.Gorra // 5.Llavero");

    let productoBusqueda = productos.find(i => i.id == seleccion);

    if (productoBusqueda) {
        console.log("Producto si existe", productoBusqueda);
        agregarProducto(productoBusqueda);

    } else {
        console.log("Producto no existe");
        alert("Producto no existe");
    }
};

// funcion para agregar productos
let productosElegidos = [];
function agregarProducto(seleccion) {
    productosElegidos.push(seleccion);
}

// funcion para preguntar por mas productos
function masProductos() {
    const confirmar = confirm("Desea agregar mas productos?");
    return confirmar;
}

// funcion para sumar el total incluyendo el 20% de dscto. en los productos indicados //

function calcularTotal() {
    let total = 0;
    const descuento = 0.20;

    for (let i = 0; i < productosElegidos.length; i++) {
        if (productosElegidos[i].descuento) {
            const precioConDescuentoFinal = productosElegidos[i].precio - (productosElegidos[i].precio * descuento);
            total += precioConDescuentoFinal;
        } else {
            const precioSinDescuentoFinal = productosElegidos[i].precio;
            console.log(precioSinDescuentoFinal, "Precio con descuento final")
            total += precioSinDescuentoFinal;
        }
    }

    total = console.log(`Gracias por su compra, precio total con dscto.: S/. ${total} soles`);
    return total;
}


/* 2do paso. Llamo a las funciones:
1. Saludo
2. Mostrar lista
3. Elegir productos x ID
4. Comprobar existencia del producto
5. Agregar productos
6. Consultar si desea agregar mas productos
7. Filtrar producto por descuento
8. Total (por consola)
*/

let mensajeSaludo = saludo();
console.log("Mensaje de Saludo:", mensajeSaludo);

mostrarProducto();

while (masProductos()) {
    mostrarProducto();
};


console.log(productosElegidos);

calcularTotal();




//imprimir anuncio//

/* console.log("S/.", producto1.imprimirAnuncio());
console.log("S/.", producto2.imprimirAnuncio(),);
console.log("S/.", producto3.imprimirAnuncio(),); */





















