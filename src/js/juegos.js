//Patron modulo para que no puedan vulnerar la seguridad del juego a partir del objeto global 
const _ = require('underscore');
export const Jugar = () => { //Funcion anonima autoinvocada
    "use strict" //Es para obligar al desarrollador a declarar las cariables de forma correcta
    let deck = [],
        puntosJugador = 0,
        puntosMaquina = 0;
    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"],
        Small = document.querySelectorAll("small"),
        cartasJugador = document.querySelector("#jugador-cartas"),
        cartasComutadora = document.querySelector("#computadora-cartas"),
        btnPedir = document.querySelector("#BotonPedir"),
        btnNuevoJuego = document.querySelector("#botonComenzar"),
        btnDetener = document.querySelector("#BotonDetener");

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    //Crear baraja de cartas

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let j in tipos) {
                deck.push(i + tipos[j])
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        deck = _.shuffle(deck);
    }


    //Pedir una carta


    const pedirCarta = () => {
        return deck.pop();
    }

    //Valor de la carta

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);//Me pertime especificar que letras o que valores del string quiero recuperar
        const final = isNaN(valor)
            ? (valor === "A") ? 11 : 10
            : valor * 1;
        return final;
    }


    const turnoComputadora = (puntos) => {

        do {
            const carta = pedirCarta();
            const valor = valorCarta(carta);
            const imgCarta = document.createElement("img");
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta");
            cartasComutadora.append(imgCarta);
            puntosMaquina += valor;
            Small[1].innerText = puntosMaquina;
            if (puntosMaquina > 21) {
                break;
            } else if (puntosMaquina == 21) {
                break;
            }


        } while (puntosMaquina < puntos && puntos <= 21);
        setTimeout(() => {
            if (puntosMaquina === puntos) {
                alert('Nadie gana :(');
            } else if (puntos > 21) {
                alert('Computadora gana')
            } else if (puntosMaquina > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 150);

    }

    //Btoton Pedir carta

    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const valor = valorCarta(carta);
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        cartasJugador.append(imgCarta);
        puntosJugador += valor;
        Small[0].innerText = puntosJugador;

        if (puntosJugador == 21) {
            turnoComputadora(puntosJugador);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        } else if (puntosJugador > 21) {
            turnoComputadora(puntosJugador);
            btnPedir.disabled = true;
            btnDetener.disabled = true;

        }


    });


    //Btoton iniciar un nuevo juego


    btnNuevoJuego.addEventListener("click", () => {
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        cartasJugador.innerText = "";
        cartasComutadora.innerText = "";
        puntosMaquina = 0;
        puntosJugador = 0;
        Small[0].innerText = 0;
        Small[1].innerText = 0;
        crearDeck();


    });

    //Btoton detener

    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });
    console.log("Ejecutando");
}



