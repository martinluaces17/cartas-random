/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

function generateRandomNumber() {
  var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
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
  let carta = document.createElement("div");
  carta.classList.add("card");

  let contenido = document.createElement("span");
  contenido.classList.add("number", palo);
  if (numero == "1") numero = "A";
  if (numero == "11") numero = "J";
  if (numero == "12") numero = "Q";
  if (numero == "13") numero = "K";
  contenido.innerHTML = numero;

  carta.appendChild(contenido);
  return carta;
}

var listaCartas = [];

function generadorDeCartas() {
  listaCartas = [];
  var inputValue = document.getElementById("input").value;

  let containerCartas = document.querySelector(".container-card");
  if (containerCartas != null) {
    document.querySelector(".padre").removeChild(containerCartas);
  }

  let newContainerCartas = document.createElement("div");
  newContainerCartas.classList.add("container-card");
  let padre = document.querySelector(".padre");
  padre.appendChild(newContainerCartas);

  for (var i = 0; i < inputValue; i++) {
    let palo = generateRandomPalo();
    let numero = generateRandomNumber();

    let cartaGenerada = dibujarCarta(palo, numero);
    newContainerCartas.appendChild(cartaGenerada);
    let carta = [numero, palo];
    listaCartas.push(carta);
    console.log(listaCartas);
  }
}

const bubbleSort = arr => {
  let wall = arr.length - 1; //we start the wall at the end of the array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap

      if (arr[index][0] > arr[index + 1][0]) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }
      index++;
    }
    wall--; //decrease the wall for optimization
  }
  console.log("Ordenado", arr);
  return arr;
};

function limpiarInput() {
  let inputValue = (document.getElementById("input").value = " ");
}

function ordenar() {
  let cartasOrdenadas = bubbleSort(listaCartas);

  let newContainerCartas = document.createElement("div");
  newContainerCartas.classList.add("container-card");
  let padre = document.querySelector(".padre");
  padre.appendChild(newContainerCartas);

  console.log("Ordenadas", cartasOrdenadas);
  for (var i = 0; i < cartasOrdenadas.length; i++) {
    let palo = cartasOrdenadas[i][1];
    let numero = cartasOrdenadas[i][0];

    let cartaGenerada = dibujarCarta(palo, numero);
    newContainerCartas.appendChild(cartaGenerada);
  }
}

window.onload = function() {
  var botonGenerador = document.getElementById("draw");
  botonGenerador.addEventListener("click", generadorDeCartas);

  var btnClear = document.getElementById("clear");
  btnClear.addEventListener("click", function() {
    let containerCartas = document.querySelector(".container-card");
    if (containerCartas != null) {
      document.querySelector(".padre").removeChild(containerCartas);
    }
    limpiarInput();
    listaCartas = [];
  });

  let btnOrdenar = document.getElementById("ordenar");
  btnOrdenar.addEventListener("click", ordenar);
};
