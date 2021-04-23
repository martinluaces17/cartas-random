/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

function generateRandomNumber() {
  var number = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  let indexNumber = Math.floor(Math.random() * number.length);
  return number[indexNumber];
}

function generateRandomPalo() {
  let palo = ["heart", "diamond", "club", "spade"];
  let indexPalo = Math.floor(Math.random() * palo.length);

  return palo[indexPalo];
}

//Función que crea la carta en HTML
function dibujarCarta(palo, numero) {
  let carta = document.createElement("div"); //acá creo el elemento div
  carta.classList.add("card"); //le agrego la clase .card

  let contenido = document.createElement("span"); //creo una variable para el contenido. creo el elemento span
  contenido.classList.add("number", palo); //le agrego la clase .number y el parámetro palo
  contenido.innerHTML = numero; //mediante el innerHTML le agrego al span el parámetro número

  carta.appendChild(contenido); //acá lo que hago es al elemento carta mediante appendChild le agrego el elemento contenido como hijo (que será el contenido de la carta)
  return carta; //retorno la carta (con todo: también con su hijo "contenido")
}

var listaCartas = [];

//Esta función es para generar las cartas dependiendo del valor que se le ingrese en el input
function generadorDeCartas() {
  var inputValue = document.getElementById("input").value; //esta variable es para "agarrar" el valor del input

  ///al iniciar por primera vez la función la variable containerCartas va a dar null
  // en una próxima vez que se ejecute la función al apretar el botón, ese conteiner-card sí va a existir, entonces
  //la variable containerCartas ya no va a ser null y mediante el querySelector la está llamando y ahí se ejecutaría el if
  //de la siguiente línea por lo tanto

  let containerCartas = document.querySelector(".container-card"); //esta variable llama a elemento con clase .container-card
  if (containerCartas != null) {
    //con el if decimos que si containerCartas es distinto de null (es decir, tiene contenido, no está vacío)
    document.querySelector(".padre").removeChild(containerCartas); //entonces llamando al .padre, remueve al hijo containerCartas (es decir, el contenedor que tiene todas las cartas)
  }

  let newContainerCartas = document.createElement("div"); //entonces acá creamos una variable que creará al div
  newContainerCartas.classList.add("container-card"); //a ese div acá le agregamos la clase .container-card
  let padre = document.querySelector(".padre"); //acá traemos desde el html al div .padre
  padre.appendChild(newContainerCartas); //y acá le agregamos en forma de child -hijo- la variable anterior que contiene el container-card

  for (var i = 0; i < inputValue; i++) {
    //iniciamos el bucle donde el condicional es dependiendo del valor del input
    let palo = generateRandomPalo(); //creamos esta variable que es igualada a la función que genera de forma random el palo
    let numero = generateRandomNumber(); //acá lo mismo pero con el número

    let cartaGenerada = dibujarCarta(palo, numero); //en este linea creamos una variable que sería la carta generada donde su valor es la función que "arma" el código html de la carta: fondo, número y palo
    //y le pasamos como parametros las variables palo y numero que son quienes generarn de forma random esos numeros y figuras
    newContainerCartas.appendChild(cartaGenerada); //luego al newContainerCartas (que sería el contenedor de todas las cartas) le colocamos como hijo la carta generada que está guardada en la variable cartaGenerada

    listaCartas.push(numero);
    console.log(listaCartas);
  }
}

function limpiarInput() {
  let inputValue = (document.getElementById("input").value = " ");
}

window.onload = function() {
  //genera las cartas
  var botonGenerador = document.getElementById("draw");
  botonGenerador.addEventListener("click", generadorDeCartas);

  //las borra
  var btnClear = document.getElementById("clear");
  btnClear.addEventListener("click", function() {
    //creo esta variable donde llamo mediante queryselector al elemento que contenga la clase .container-card
    let containerCartas = document.querySelector(".container-card");
    if (containerCartas != null) {
      //con este if decimos que si esa variable es distinta de null, es decir, tiene contenido
      document.querySelector(".padre").removeChild(containerCartas); //se llama desde el html al padre y se le remueve el hijo container-cards
    }
    limpiarInput();
    listaCartas = []; //esto en teoría borra el array, es decir, por cada vez que se generan nuevas cartas y luego se borran, el array vuelve a estar vacío
  });
};
