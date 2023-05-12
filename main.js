
//tienda de merchandising//

const descuento = 0.20;

//function saludo() {
    //let nombrePersona = prompt("Por favor, ingrese su nombre:");
    //if (nombrePersona != null) {
       // alert("¡Hola " + nombrePersona + " bienvenid@ a nuestra tienda!");
   // }
//};


function Producto(nombre, precio, stock) {
    this.nombre = nombre
    this.precio = precio
    this.stock = stock


    this.precioConDescuento = function () {
        return this.precio - (precio * descuento)
    }

    this.imprimirAnuncio = function () {
        console.log(`Aprovecha el 20% de descuento en tu ${this.nombre}, disponible ${this.stock} unidades`);
    }

};


const producto1 = new Producto("polera", 120, 10)
const producto2 = new Producto("tomatodo", 80, 15)
const producto3 = new Producto("taza", 40, 30)
const producto4 = new Producto("gorra", 50, 20)
const producto5 = new Producto("llavero", 10, 100);

//respuestas por consola//
console.log(producto1.precioConDescuento())
console.log(producto2.precioConDescuento())
console.log(producto3.precioConDescuento())

console.log(producto1.imprimirAnuncio());
console.log(producto2.imprimirAnuncio());
console.log(producto3.imprimirAnuncio());


//funcion para elegir un producto//

const productosElegidos= [];

 function agregarProducto (Producto) {
   productosElegidos.push (Producto);
 }
 //agregar productos por consola agregarProducto (producto3) y luego revisar//
console.log (productosElegidos)
 

 // funcion para quitar un producto//
 
 function eliminarProducto (nombre) {
    productosElegidos = productosElegidos.filter(function(Producto) {
        return Producto.nombre !== nombre;
    });
}

function calcularTotal() {
    const total = 0;
    for (const i = 0; i < productosElegidos.length; i++) {
        total += productosElegidos[i].precio;
    }
    return total;
}

















