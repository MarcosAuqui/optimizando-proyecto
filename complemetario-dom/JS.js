class Producto{
    constructor(id, cantidad, nombre, precio, imagen){
        this.id = id,
        this.cantidad = cantidad,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen
    }
    /* mostrarDatos(){
        console.log(`el producto es ${this.nombre} y su precio es $${this.precio}`)
    } */
}
// creacion de productos
const producto1 = new Producto(1, 1, "leche", 150, "leche.jpg")
const producto2 = new Producto(2, 1, "galletitas", 100, "galletas.jpg")
const producto3 = new Producto(3, 1, "cerveza", 230, "cerveza.jpg")
const producto4 = new Producto(4, 1, "manteca", 200, "manteca.jpg")
const producto5 = new Producto(5, 1, "azucar", 100 , "azucar.jpg")
const producto6 = new Producto(6, 1, "arroz", 150 , "arroz.jpg") 
const producto7  = new Producto(7, 1, "Papas lays ", 230, "papas-lays.jpg")
const producto8  = new Producto(8, 1, "Doritos", 230, "doritos.jpg")


// DOM DEL CARRITO
const contenedorProdctos = document.getElementById("contenedor-productos")
const precioTotal = document.getElementById("precioTotal")
const contadorCarrito = document.getElementById("contadorCarrito")
const contenedorCarrito = document.getElementById("carrito-contenedor")


// OPERADOR OR
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let stockProductos = []
/* if(localStorage.getItem("stockProductos")){
    stockProductos = JSON.parse(localStorage.getItem("stockProductos"))
}else{
    stockProductos.push(producto1, producto2,producto3, producto4, producto5, producto6, producto7, producto8)
    localStorage.setItem("stockProductos", JSON.stringify(stockProductos))
} */
// OPERADOR  TERNARIO
localStorage.getItem("stockProductos") ? stockProductos = JSON.parse(localStorage.getItem("stockProductos")) : stockProductos.push(producto1, producto2,producto3, producto4, producto5, producto6, producto7, producto8)
localStorage.setItem("stockProductos", JSON.stringify(stockProductos))


function verProductos(array){
    contenedorProductos.innerHTML=""
    array.forEach(Producto =>{
        const {id, cantidad, nombre, precio, imagen} = Producto //DESESTRUTURACION
        let div = document.createElement("div")
        div.innerHTML = `
                         <div id= "${id}" class="card" style="width: 18rem; background-color:  rgb                  (185, 159, 210);">
                          <img src="./imagenes/${imagen}" style="height: 250px;" class="card-img-top" alt="Molten gg7X">
                          <div class="card-body">
                            <h5 class="card-title">${nombre}</h5>
                            <p class="precio">Precio: $${precio}</p>
                            <a href="#" id="btnAgregar${id}" class="btn btn-outline-success " style= "background-color: purple;">Agregar al carrito.</a>
                            
                         </div>`
        contenedorProductos
    })
}
stockProductos.forEach((Producto) => {
    const div = document.createElement("div")
    div.classList.add("producto")
    div.innerHTML = `
    <div id= "${Producto.id}" class="card" style="width: 18rem; background-color:  rgb(185, 159, 210);">
     <img src="./imagenes/${Producto.imagen}" style="height: 250px;" class="card-img-top" alt="Molten gg7X">
     <div class="card-body">
       <h5 class="card-title">${Producto.nombre}</h5>
       <p class="precio">Precio: $${Producto.precio}</p>
       <a href="#" id="btnAgregar${Producto.id}" class="btn btn-outline-success " style= "background-color: purple;">Agregar al carrito.</a>
       
    </div>`
    contenedorProdctos.appendChild(div)

    // btn agregarAlCarrito
    const btn = document.getElementById(`btnAgregar${Producto.id}`)
    btn.addEventListener(`click`, () =>{
        agregarAlCarrito(Producto.id)
    })
})


// boton  para vaciar el carrito
const btnVaciar = document.getElementById("vaciar-carrito")
btnVaciar.addEventListener(`click`, () =>{
    carrito.length = 0
    actualizarCarrito()
})


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement("div")
        div.className = ("productoEnCarrito")
        div.innerHTML = `
        <p> ${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad"> ${prod.cantidad}</p>
        <button onclick= "eliminarDelCarrito(${prod.id})" class="btn-eliminar" >Eliminar</button>`
        contenedorCarrito.appendChild(div)
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}





function agregarAlCarrito(prodID){
    const existe = carrito.some(prod => prod.id === prodID)
    if(existe){
        const prod = carrito.map(prod => {
            // operador AND
            prod.id === prodID && prod.cantidad++
        })
    }else{
    const item = stockProductos.find((prod) => prod.id === prodID)
    carrito.push(item)
    console.log(carrito)

}
actualizarCarrito()
}



const eliminarDelCarrito = (prodID) => {
    const item = carrito.find((prod) => prod.id === prodID)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}




function nuevoProducto(array){
    let añadirNombre = document.getElementById(`nombreAñadir`)
    let añadirPrecio = document.getElementById(`precioAñadir`)

    let newProduct = new Producto(stockProductos.length+1, 1, añadirNombre.value, añadirPrecio.value, "leche.jpg")
    stockProductos.push(newProduct)
    localStorage.setItem("stockProductos", JSON.stringify(stockProductos))
}

const formulario = document.getElementById(`myForm`)

let btnInfoProduc = document.getElementById(`btnEnviarInfo`)
btnInfoProduc.addEventListener("click",() => {nuevoProducto(stockProductos)})
btnInfoProduc.addEventListener("click",() => {formulario.reset()})


// ocultar modal - carrito
let btnOcultarCarrito = document.getElementById(`btnOcultarCarrito`)

btnOcultarCarrito.addEventListener("click", borrarMenuCarrito)

function borrarMenuCarrito(){
    contenedorCarrito.innerHTML = ``
}
/* let btnMostrarCarrito = document.getElementById("btnMostrarCarrito")
btnMostrarCarrito.addEventListener("click", () => {
    stockProductos
}) */
