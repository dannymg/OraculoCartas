const simboloCarta = ["♣", "♠", "♥", "♦"];
const numeroCarta = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const naipeTrebol = [
  "🃑",
  "🃒",
  "🃓",
  "🃔",
  "🃕",
  "🃖",
  "🃗",
  "🃘",
  "🃙",
  "🃚",
  "🃛",
  "🃝",
  "🃞",
];
const naipePica = [
  "🂡",
  "🂢",
  "🂣",
  "🂤",
  "🂥",
  "🂦",
  "🂧",
  "🂨",
  "🂩",
  "🂪",
  "🂫",
  "🂭",
  "🂮",
];
const naipeCorazon = [
  "🂱",
  "🂲",
  "🂳",
  "🂴",
  "🂵",
  "🂶",
  "🂷",
  "🂸",
  "🂹",
  "🂺",
  "🂻",
  "🂽",
  "🂾",
];
const naipeDiamante = [
  "🃁",
  "🃂",
  "🃃",
  "🃄",
  "🃅",
  "🃆",
  "🃇",
  "🃈",
  "🃉",
  "🃊",
  "🃋",
  "🃍",
  "🃎",
];

//Conjunto de cartas
var naipeCarta = naipeTrebol.concat(naipePica, naipeCorazon, naipeDiamante);
var contadorMovimientoOraculo = 0;

//Generar la primera baraja
var barajaOrigen = generarBaraja();
cargarCartas(barajaOrigen);

//Barajar al dar click en el botón
let botonJugar = document.getElementById("botonJugar");
botonJugar.addEventListener("click", function () {
  let baraja = barajaOrigen;
  barajaOrigen = barajar(baraja);
  // Montones inciales

  matrizMontones = crearMatrizMonton();
  matrizMontones = llenarMontones(matrizMontones, barajaOrigen);
});

//Siguiente paso
var matrizMontones = new Array(13);
let botonOraculo = document.getElementById("botonOraculo");
botonOraculo.addEventListener("click", function () {
  contadorMovimientoOraculo += 1;
  oraculo();
  //agregarCartaArriba();
});

//Cambio del console.log
var originalLog = console.log;
console.log = function (obj) {
  originalLog(JSON.parse(JSON.stringify(obj)));
};

//Objeto de Carta
function crearCarta(color, naipe, numero, simbolo) {
  let carta = {
    color: color,
    naipe: naipe,
    numero: numero,
    simbolo: simbolo,
    estado: "ABAJO",
  };
  return carta;
}

//Generar la baraja inicial
function generarBaraja() {
  let baraja = new Array();
  //Contador para asignar la imagen de naipe
  let contadorNaipe = 0;
  //Por cada simbolo (de los 4: ♣, ♠, ♥, ♦)
  for (let i = 0; i < simboloCarta.length; i++) {
    //Por cada carta (de A a K)
    for (let j = 0; j < numeroCarta.length; j++) {
      //Agregar simbolo correspondiente
      let simbolo = simboloCarta[i];
      //Agregar numero correspondiente
      let numero = numeroCarta[j];

      //Definir color
      let color;
      if (simboloCarta[i] == "♣" || simboloCarta[i] == "♠") {
        color = "negro";
      } else {
        color = "rojo";
      }

      //Agregar imagen para la carta definida
      let naipe = naipeCarta[contadorNaipe];

      //Creando y agregando la nueva carta a la baraja
      let carta = crearCarta(color, naipe, numero, simbolo);
      baraja.push(carta);

      contadorNaipe++;
    }
  }
  console.log(baraja);
  return baraja;
}

function cargarCartas(baraja) {
  console.log(baraja);
  let cantMontones = 13;
  console.log("Montones: ", cantMontones);
  // Obteniendo y limpiando divs contenedores
  for (let i = 1; i <= cantMontones; i++) {
    let nombre = "M" + i;
    console.log(nombre);
    const element = document.getElementById(nombre);
    element.innerHTML = " ";
  }

  //Contador para reiniciar a los 13 montones
  let contadorReinicio = 0;

  for (let i = baraja.length - 1; i >= 0; i--) {
    contadorReinicio++;
    let nuevaCarta;
    //Si la carta es de color rojo, ubicar dicho estilo class="cartaRoja"
    if (baraja[i].color == "rojo") {
      nuevaCarta = '<p class="cartaRoja">' + baraja[i].naipe + "</p>";
    }
    //Si la carta es de color negro, ubicar dicho estilo class="cartaNegra"
    if (baraja[i].color == "negro") {
      nuevaCarta = '<p class="cartaNegra">' + baraja[i].naipe + "</p>";
    }
    let contenedor = "M" + contadorReinicio;
    const element = document.getElementById(contenedor);
    element.innerHTML += nuevaCarta;
    //Salto de linea si se llega a las 13 cartas
    if (contadorReinicio == cantMontones) {
      contadorReinicio = 0;
    }
  }
}

var iMontonActual = 0;
var iMontonSiguiente = 12;

function oraculo() {
  let bandera = true;
  for (let i = 0; i < matrizMontones.length; i++) {
    if (matrizMontones[i].existenCartas == true) {
      bandera = false;
    }
  }

  if (
    iMontonActual == iMontonSiguiente &&
    !matrizMontones[iMontonActual].existenCartas &&
    matrizMontones[iMontonActual].cartas.length <= 4
  ) {
    return alert("Perdiste :(");
  }

  if (iMontonActual == iMontonSiguiente && bandera) {
    return alert("Ganaste :D");
  }

  iMontonActual = iMontonSiguiente;
  jugarOraculo();
  console.log(matrizMontones);
  cargarMontones(matrizMontones);
  agregarCartaArriba();
}

//Matriz de montones. Cuatro arreglos contienen las cartas
function crearMatrizMonton() {
  for (let i = 0; i < matrizMontones.length; i++) {
    matrizMontones[i] = crearMonton(i + 1);
  }

  return matrizMontones;
}

//Objeto de Carta
function crearMonton(id) {
  let monton = {
    id: id,
    cartas: new Array(),
    contadorCartasArriba: 0,
    existenCartas: true,
  };
  return monton;
}

function cargarMontones(matrizMontones) {
  // Obteniendo y limpiando divs contenedores
  for (let i = 1; i <= matrizMontones.length; i++) {
    let nombre = "M" + i;
    console.log(nombre);
    const element = document.getElementById(nombre);
    element.innerHTML = " ";
  }

  //Contador para reiniciar a los 13 montones
  let contadorMonton = 1;
  let contadorReinicio = 0;
  matrizMontones.forEach((monton) => {
    let cartas = monton.cartas;

    for (let i = 0; i < cartas.length; i++) {
      //Si la carta es de color rojo, ubicar dicho estilo class="cartaRoja"
      if (cartas[i].color == "rojo") {
        nuevaCarta = '<p class="cartaRoja">' + cartas[i].naipe + "</p>";
      }
      //Si la carta es de color negro, ubicar dicho estilo class="cartaNegra"
      if (cartas[i].color == "negro") {
        nuevaCarta = '<p class="cartaNegra">' + cartas[i].naipe + "</p>";
      }
      let contenedor = "M" + contadorMonton;
      const element = document.getElementById(contenedor);
      element.innerHTML += nuevaCarta;
      contadorReinicio++;
      //Salto de linea si se llega a las 4 cartas
      if (contadorReinicio == cartas.length) {
        contadorReinicio = 0;
        contadorMonton++;
        element.innerHTML += "<br>";
      }
    }
  });
}

function llenarMontones(matrizMontones, baraja) {
  console.log(baraja);
  // Obteniendo y limpiando divs contenedores
  for (let i = 1; i <= matrizMontones.length; i++) {
    let nombre = "M" + i;
    console.log(nombre);
    const element = document.getElementById(nombre);
    element.innerHTML = " ";
  }

  //Contador para reiniciar a los 13 montones
  let contadorMonton = 0;
  let contadorReinicio = 0;
  let contadorElemento = 0;

  for (let i = baraja.length - 1; i >= 0; i--) {
    contadorReinicio++;
    let nuevaCarta;

    baraja[i].estado = "ABAJO";
    matrizMontones[contadorMonton].cartas.push(baraja[i]);

    //Si la carta es de color rojo, ubicar dicho estilo class="cartaRoja"
    if (baraja[i].color == "rojo") {
      nuevaCarta = '<p class="cartaRoja">' + baraja[i].naipe + "</p>";
    }
    //Si la carta es de color negro, ubicar dicho estilo class="cartaNegra"
    if (baraja[i].color == "negro") {
      nuevaCarta = '<p class="cartaNegra">' + baraja[i].naipe + "</p>";
    }
    let contenedor = "M" + contadorReinicio;
    const element = document.getElementById(contenedor);
    element.innerHTML += nuevaCarta;
    //Salto de linea si se llega a las 13 cartas
    if (contadorReinicio == matrizMontones.length) {
      contadorReinicio = 0;
      contadorMonton = 0;
      contadorElemento++;
    } else {
      contadorMonton++;
    }
  }
  console.log(matrizMontones);

  return matrizMontones;
}

function jugarOraculo() {
  console.log(matrizMontones);

  if (matrizMontones[iMontonActual].contadorCartasArriba <= 4) {
    const divEscogida = document.getElementById("cartaEscogida");
    divEscogida.innerHTML = "";

    let cartaEscogida = matrizMontones[iMontonActual].cartas.shift();

    let carta = '<p class="cartaEscogida">' + cartaEscogida + "</p>";
    divEscogida.innerHTML = carta;

    console.log(iMontonActual);
    console.log(matrizMontones[iMontonActual]);
    console.log(cartaEscogida);

    iMontonSiguiente = cartaEscogida.numero - 1;
    cartaEscogida.estado = "ARRIBA";

    matrizMontones[iMontonSiguiente].cartas.push(cartaEscogida);
    matrizMontones[iMontonSiguiente].contadorCartasArriba += 1;

    if (matrizMontones[iMontonSiguiente].contadorCartasArriba == 4) {
      matrizMontones[iMontonSiguiente].existenCartas = false;
    }
    console.log(iMontonSiguiente);
    console.log(matrizMontones[iMontonSiguiente]);
  }
}

/*








  Funcion para barajar








*/

//Funcion Cajon
function generarRadomMinMax(A, B) {
  let min = A + 0.1;
  let max = B + 0.9;
  aleatorio = min + (max - min) * Math.random();
  //Devuelve el máximo entero menor o igual a un número
  return Math.floor(aleatorio);
}

//Determinar el lado que caerá
function generarRandomLado() {
  let lados = ["D", "I"];
  //O: Derecha, 1:Izquierda
  let x = generarRadomMinMax(0, 1);
  return lados[x];
}

//Obtener el valor de separacion de las cartas
function generarRandomMitad() {
  //Generar un random entre 20 y 32 cartas
  let mitadValor = generarRadomMinMax(20, 32);
  return mitadValor;
}

//Determinar el cuantas cartas caerán
function generarRandomCantidadCarta(mitad) {
  //Caen entre 1 a 6 cartas
  let cantCarta = generarRadomMinMax(1, 6);
  //Si la cantidad generada es mayor a las cartas
  // existentes en la mitad
  if (cantCarta > mitad.length) {
    cantCarta = mitad.length;
  }
  return cantCarta;
}

//Llenar una mitad de las cartas.
//Primera: 0 a X, segunda X a 51
function llenarMitad(inicio, fin, baraja) {
  let mitad = new Array();
  for (let i = inicio; i < fin; i++) {
    mitad.push(baraja[i]);
  }
  return mitad;
}

//Soltar X cantidad de cartas de una mitad
//Reasignar una nueva baraja que incluye las cartas que cayeron
function soltarCarta(cantCarta, mitad, nuevaBaraja) {
  for (let i = 0; i < cantCarta; i++) {
    nuevaBaraja.push(mitad[i]);
  }
  return nuevaBaraja;
}

//Eliminar las cartas que cayeron de una mitad
function quitarCarta(mitad, cantCarta) {
  for (let i = 0; i < cantCarta; i++) {
    //Elimina el primer elemento de un Array
    mitad.shift();
  }
  return mitad;
}

function llenarNuevaBaraja(mitad, nuevaBaraja) {
  let cantCarta = generarRandomCantidadCarta(mitad);
  console.log(cantCarta);
  nuevaBaraja = soltarCarta(cantCarta, mitad, nuevaBaraja);
  mitad = quitarCarta(mitad, cantCarta);
  return [mitad, nuevaBaraja];
}

function barajar(baraja) {
  console.log("Baraja Inicial");
  console.log(baraja);
  let nuevaBaraja = new Array();

  let valorMitad = generarRandomMitad();
  let primeraMitad = llenarMitad(0, valorMitad, baraja);
  let segundaMitad = llenarMitad(valorMitad, baraja.length, baraja);

  console.log("Valor mitad:");
  console.log(valorMitad);
  console.log(primeraMitad);
  console.log(segundaMitad);

  //Booleano: Permitirá soltar cartas mientras existan
  let existenCartas = true;

  while (existenCartas) {
    console.log("Entrando...");
    console.log(primeraMitad);
    console.log(segundaMitad);
    console.log(nuevaBaraja);

    let lado = generarRandomLado();
    //Arreglo: La funcion devuelve la mitad modificada
    // y la baraja con las cartas soltadas
    let [x, y] = [new Array(), new Array()];
    //Hay cartas en ambas mitades
    if (primeraMitad.length != 0 && segundaMitad.length != 0) {
      if (lado == "D") {
        console.log("Ambos existen");
        console.log("D");
        console.log("Suelta cartas de la primera");
        [x, y] = llenarNuevaBaraja(primeraMitad, nuevaBaraja);
        primeraMitad = x;
        nuevaBaraja = y;

        console.log("Suelta cartas de la segunda");
        [x, y] = llenarNuevaBaraja(segundaMitad, nuevaBaraja);
        segundaMitad = x;
        nuevaBaraja = y;
      }

      if (lado == "I") {
        console.log("Ambos existen");
        console.log("I");
        console.log("Suelta cartas de la segunda");
        [x, y] = llenarNuevaBaraja(segundaMitad, nuevaBaraja);
        segundaMitad = x;
        nuevaBaraja = y;

        console.log("Suelta cartas de la primera");
        [x, y] = llenarNuevaBaraja(primeraMitad, nuevaBaraja);
        primeraMitad = x;
        nuevaBaraja = y;
      }
    }

    //Solo hay cartas en la primera mitad
    else if (primeraMitad.length != 0 && segundaMitad.length == 0) {
      console.log("Solo existe la primera");
      console.log("Suelta cartas de la primera");
      [x, y] = llenarNuevaBaraja(primeraMitad, nuevaBaraja);
      primeraMitad = x;
      nuevaBaraja = y;
    }

    //Solo hay cartas en la segunda mitad
    else if (primeraMitad.length == 0 && segundaMitad.length != 0) {
      console.log("Solo existe la segunda");
      console.log("Suelta cartas de la segunda");
      [x, y] = llenarNuevaBaraja(segundaMitad, nuevaBaraja);
      segundaMitad = x;
      nuevaBaraja = y;
    }

    //Ya no quedan cartas en ninguna mitad
    else {
      console.log("Se acabaron las cartas");
      existenCartas = false;
    }
  }
  console.log("Nueva Baraja");
  console.log(nuevaBaraja);
  //Cargando la nueva baraja en el contenedor correspondiente
  cargarCartas(nuevaBaraja);
  return nuevaBaraja;
}

function agregarCartaArriba() {
  // Limpiando el div
  for (let i = 1; i <= 13; i++) {
    let nombreDiv = "arriba" + i;
    const arriba = document.getElementById(nombreDiv);
    arriba.innerHTML = "";
  }

  for (let i = 0; i < matrizMontones.length; i++) {
    let nombreDiv = "arriba" + (i + 1);
    const arriba = document.getElementById(nombreDiv);
    if (matrizMontones[i].contadorCartasArriba > 0) {
      let posicion = 3;
      for (let j = 0; j < matrizMontones[i].contadorCartasArriba; j++) {
        const cartaArriba = matrizMontones[i].cartas[j].naipe;
        const cartaHTML = document.createElement("div");
        cartaHTML.innerHTML = '<p class="cartaNegra">' + cartaArriba + "</p>";
        cartaHTML.classList.add("cartaArriba");
        cartaHTML.style.top = `${i * 30}px`;
        arriba.appendChild(cartaHTML);
      }
    }
  }
}
