
//tienda de merchandising//

// 1er paso. Declaro funciones y constantes/variables globales, que se usaran para todas las funciones //

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

function Producto(nombre, precio, stock) {
    this.nombre = nombre
    this.precio = precio
    this.stock = stock

    this.imprimirAnuncio = function () {
        console.log(`Aprovecha el 20% de descuento en tu ${this.nombre}, disponible ${this.stock} unidades`);
        return this.precio;
    }

};

//funcion para elegir un producto//

let productosElegidos = [];

function agregarProducto(nombre) {
    productosElegidos.push(nombre);
}

// funcion para sumar el total - el 20% de dscto.//

function calcularTotal() {
    let total = 0;
    const descuento = 0.20;

    for (let i = 0; i < productosElegidos.length; i++) {
        const precioConDescuentoFinal = productosElegidos[i].precio - (productosElegidos[i].precio * descuento);
        console.log(precioConDescuentoFinal, "Precio con descuento final")
        total += precioConDescuentoFinal;
    }
    total = console.log(`Gracias por su compra, precio total con dscto.: S/. ${total} soles`);
    return total;
}


// Constantes globales

const producto1 = new Producto("polera", 120, 10)
const producto2 = new Producto("tomatodo", 80, 15)
const producto3 = new Producto("taza", 40, 30)
const producto4 = new Producto("gorra", 50, 20)
const producto5 = new Producto("llavero", 10, 100);


/* 2do paso. Llamo a las funciones:
1. Saludo
2. Agregar productos
3. Total
*/

let mensajeSaludo = saludo();
console.log("Mensaje de Saludo:", mensajeSaludo);

//respuestas por consola funcion imprimir anuncio//

console.log("S/.",producto1.imprimirAnuncio());
console.log("S/.",producto2.imprimirAnuncio(),);
console.log("S/.",producto3.imprimirAnuncio(),);


//agregar productos por ejem: agregarProducto(producto3) y luego revisar: console.log(productosElegidos)

agregarProducto(producto3), agregarProducto(producto5)
console.log("productos elegidos", productosElegidos)


//total de la compra con descuento/
let finalizar = calcularTotal();


















