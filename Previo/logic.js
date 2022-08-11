const simboloCarta = ["♣", "♠", "♥", "♦"];
const numeroCarta = [
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
  "K",
];
const valorCarta = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

//Generar la primera baraja
var barajaOrigen = generarBaraja();
cargarCartas(barajaOrigen);

//Barajar al dar click en el botón
let botonBarajar = document.getElementById("botonBarajar");
botonBarajar.addEventListener("click", function () {
  let baraja = barajaOrigen;
  barajaOrigen = barajar(baraja);
});

//Truco al dar click en el botón
let botonTruco = document.getElementById("botonTruco");
botonTruco.addEventListener("click", function () {
  trucoPos9(barajaOrigen);
});

//Cambio del console.log
var originalLog = console.log;
console.log = function (obj) {
  originalLog(JSON.parse(JSON.stringify(obj)));
};

//Objeto de Carta
function crearCarta(color, naipe, numero, simbolo, valor) {
  let carta = {
    color: color,
    naipe: naipe,
    numero: numero,
    simbolo: simbolo,
    valor: valor,
  };
  return carta;
}

//Generar la baraja inicial
function generarBaraja() {
  let baraja = new Array();
  //Contador para asignar la imagen de naipe
  contadorNaipe = 0;
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

      //Asignar valor correspondiente a la carta (para truco)
      let valor;
      if (j <= 9) {
        valor = valorCarta[j];
      } else {
        //Al parecer, el truco funciona con cualquier valor a las cartas especiales (1 al 10)
        //valor=2
        valor = 10;
      }

      //Agregar imagen para la carta definida
      let naipe = naipeCarta[contadorNaipe];

      //Creando y agregando la nueva carta a la baraja
      let carta = crearCarta(color, naipe, numero, simbolo, valor);
      baraja.push(carta);

      contadorNaipe++;
    }
  }
  // console.log(baraja);
  return baraja;
}

function cargarCartas(baraja) {
  //Obteniendo el div contenedor
  const container = document.getElementById("container");
  container.innerHTML = "";
  //Limpiando los otros DIV, que pueden existir si ya se realizó el truco
  const slot = document.getElementById("slot");
  slot.innerHTML = " ";
  const carta = document.getElementById("carta");
  carta.innerHTML = " ";
  //Contador para saltar a las 13 cartas
  let contadorSalto = 0;

  for (let i = 0; i < baraja.length; i++) {
    contadorSalto++;
    //Si la carta es de color rojo, ubicar dicho estilo class="cartaRoja"
    if (baraja[i].color == "rojo") {
      nuevaCarta = '<p class="cartaRoja">' + baraja[i].naipe + "</p>";
      container.innerHTML += nuevaCarta;
    }
    //Si la carta es de color negro, ubicar dicho estilo class="cartaNegra"
    if (baraja[i].color == "negro") {
      nuevaCarta = '<p class="cartaNegra">' + baraja[i].naipe + "</p>";
      container.innerHTML += nuevaCarta;
    }
    //Salto de linea si se llega a las 13 cartas
    if (contadorSalto == 13) {
      container.innerHTML += "<br>";
      contadorSalto = 0;
    }
  }
}

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

function trucoPos9(baraja) {
  let barajaAux = baraja;
  //Empezando desde la última carta
  let pos = 51;
  //Matriz que contiene los 4 montones separados
  let matrizMontones = crearMatrizMonton();
  //Arreglo con el valor final de cada montón
  let valoresFinales = new Array();

  //Para los 4 montones
  for (let i = 0; i < 4; i++) {
    //Booleano para definir TRUE cuando (valor==contador)
    let cartaCoincide = false;
    let contadorCartas = 10;
    //Contador de elementos del monton (hasta 10, si no se encontró coincidencia)
    let j = 0;
    //Mientras no se ha encontrado coincidencia
    // y los elementos sean menores que 11 (max: indice 10)
    while (!cartaCoincide && j < 11) {
      //Cargando carta en el monton correspondiente
      matrizMontones[i].push(barajaAux[pos]);
      //Si el contador y el valor de la carta son iguales, se toma el valor
      // También, termina el ciclo cambiando el valor del Boolean
      if (barajaAux[pos].valor == contadorCartas) {
        cartaCoincide = true;
        valoresFinales.push(barajaAux[pos].valor);
      }

      //Cambios en contadores
      contadorCartas--;
      pos--;
      j++;
      // console.log("Dentro: " + pos);
    }
    //Si no se ha coincidido ningún valor, se asigna 0 al valor del monton
    // Esto permitirá que no tenga influencia en la suma
    if (cartaCoincide == false) {
      valoresFinales.push(0);
    }

    // console.log("Fuera: " + pos);
    console.log(matrizMontones);
    console.log(valoresFinales);
  }

  //Se suman los valores de cada montón para determinar cuántas cartas
  // se deben quitar para encontrar la seleccionada (9na)
  let mover = 0;
  for (let i = 0; i < valoresFinales.length; i++) {
    mover = mover + valoresFinales[i];
  }

  console.log("Mover:" + mover);
  console.log("Pos antes:" + pos);

  //Resto la cantidad de cartas que antes definida.
  // Sumo 1 carta por el "movimiento" final que hice previo a salir del while.
  pos = pos - mover + 1;
  // console.log("Pos despues:" + pos);

  //Si todos estan en 0, pos ya se encuentra en la carta escogida.
  console.log(matrizMontones);
  console.log(barajaAux[pos].numero + barajaAux[pos].simbolo);

  cargarMontones(matrizMontones);
  cargarCartaFinal(barajaAux[pos]);
}

//Matriz de montones. Cuatro arreglos contienen las cartas
function crearMatrizMonton() {
  let matrizMontones = new Array(4);
  matrizMontones[0] = new Array();
  matrizMontones[1] = new Array();
  matrizMontones[2] = new Array();
  matrizMontones[3] = new Array();
  return matrizMontones;
}

function cargarMontones(matrizMontones) {
  //Obteniendo el div contenedor
  const slot = document.getElementById("slot");
  slot.innerHTML = " ";
  let stringSLOT = "<p class='texto'>MONTONES DE CARTAS</p>";

  for (let i = 0; i < matrizMontones.length; i++) {
    stringSLOT = stringSLOT.concat(
      "<p class='texto'>MONTÓN " + (i + 1) + "</p>"
    );
    for (let j = 0; j < matrizMontones[i].length; j++) {
      //Si es la última carta del montón y no hay 11 cartas en dicho montón
      if (j == matrizMontones[i].length - 1 && matrizMontones[i].length <= 10) {
        //Agregar una flecha como indicativo que es la carta seleccionada
        stringSLOT = stringSLOT.concat('<p class="flecha"> 🠮 </p>');
      }

      //Si la carta es de color rojo, ubicar dicho estilo class="cartaRoja"
      if (matrizMontones[i][j].color == "rojo") {
        stringSLOT = stringSLOT.concat(
          '<p class="cartaRoja">' + matrizMontones[i][j].naipe + "</p>"
        );
      }
      //Si la carta es de color negro, ubicar dicho estilo class="cartaNegra"
      if (matrizMontones[i][j].color == "negro") {
        stringSLOT = stringSLOT.concat(
          '<p class="cartaNegra">' + matrizMontones[i][j].naipe + "</p>"
        );
      }
    }
    //Salto de linea para el monton
    stringSLOT = stringSLOT.concat("<br>");
  }
  slot.innerHTML = stringSLOT;
}

function cargarCartaFinal(cartaEscogida) {
  const carta = document.getElementById("carta");
  carta.innerHTML = " ";
  let stringCARTA = " ";

  //Carta final
  stringCARTA = stringCARTA.concat(
    "<p class='texto'> CARTA FINAL (posicion 9)</p>"
  );

  //Si la carta es de color rojo
  if (cartaEscogida.color == "rojo") {
    stringCARTA = stringCARTA.concat(
      '<p class="cartaRoja">' + cartaEscogida.naipe + "</p>"
    );
  }
  //Sino, es una carta negra
  else {
    stringCARTA = stringCARTA.concat(
      '<p class="cartaNegra">' + cartaEscogida.naipe + "</p>"
    );
  }
  carta.innerHTML = stringCARTA;
}
