
//tienda de merchandising//

/* 1er paso. Declaramos funciones y constantes/variables globales, que se usaran para todas las funciones */

//Funciones
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
  
  function Producto(nombre, precio, stock) {
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
  
    this.imprimirAnuncio = function () {
      console.log(`Aprovecha el 20% de descuento en tu ${this.nombre}, disponible ${this.stock} unidades`);
      return this.precio; /* Para que la funcion no te de "undefined" puede retornar el precio o cualquier otro dato */
    }
    this.precioConDescuento = function () {
      console.log("precio con descuento FX");
      return this.precio - (precio * descuento)
    }
  
  };
  
  
  //funcion para elegir un producto//
  
  let productosElegidos = [];
  
  function agregarProducto(nombre) {
    productosElegidos.push(nombre);
  }
  
  // funcion para  sumar el total//
  
  function calcularTotal() {
    /* Aca estoy cambiando el "const total" por let total, ya que es un valor que si cambiara. */
    let total = 0;
    for (let i = 0; i < productosElegidos.length; i++) {
      total += productosElegidos[i].precio;
    }
    /* Dentro de calcularTotal estoy agregando el console.log 
    porque de lo contrario, este console log se ejecuta, pero da error porque no existe [total] fuera del ambito de la funcion */
    console.log(` Gracias por su compra, el total es de + ${total}`);
    return total;
  }
  
  
  
  // Constantes globales
  
  const descuento = 0.20;
  const producto1 = new Producto("polera", 120, 10)
  const producto2 = new Producto("tomatodo", 80, 15)
  const producto3 = new Producto("taza", 40, 30)
  const producto4 = new Producto("gorra", 50, 20)
  const producto5 = new Producto("llavero", 10, 100);
  
  
  /* 2do paso. Llamamos a las funciones en el orden que deseamos 
  1. Saludo
  2. Agregar productos
  3. Total
  */
  
  
  let mensajeSaludo = saludo();
  console.log("mensajeSaludo", mensajeSaludo);
   /* Estaba retornando undefined porque la funcion saludo no retornaba nada, solo imprime los datos en pantalla. 
  Entonces estoy agregando una constante "saludo" que tiene lo que deseas que imprima la pantalla, y esa constante es lo que retorna la funcion.*/
  
  
  
  //respuestas por consola//
  
  console.log("funcion precio con descto 1:", producto1.precioConDescuento())
  console.log(producto2.precioConDescuento())
  console.log(producto3.precioConDescuento())
  
  console.log("funcion imprimir anuncio 1:", producto1.imprimirAnuncio()); /* Esto esta retornando "undefined" en la consola porque es una funcion que no retorna nada. */
  console.log(producto2.imprimirAnuncio());
  console.log(producto3.imprimirAnuncio());
  
  
  //agregar productos por ejem: agregarProducto(producto3) y luego revisar: console.log(productosElegidos)
  
  agregarProducto(producto3), agregarProducto(producto5)
  console.log("productos elegidos", productosElegidos)
  
  
  
  
  //falta definir el total//
  let finalizar = calcularTotal();
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  