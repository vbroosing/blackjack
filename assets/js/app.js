//  C = clover, trevol
//  D = Diamond, diamante
//  H = Hearts, corazon
//  S = Spades, pica


let puntosComputador = 0,
    puntosJugador = 0;


// Esta funcion crea una baraja mezclada
const crearBaraja = ( ) =>{

    let baraja = [];
    const tipos = 'CDHS';
    const letras = 'AJQK';

    for( let letra of tipos ){

        // Creando baraja numerica
        for( let i = 2; i <= 10; i++ ){
            baraja.push( i + letra );
        }
        // Añandiendo As, Jota, Qüina y Kaiser
        for( let alfa of letras){
            baraja.push( alfa + letra )
        }

    }

    baraja = _.shuffle(baraja);

    return baraja;
}

// Creando baraja
let barajaMezclada = crearBaraja();

const pedirCarta = () => {
    const carta = barajaMezclada.pop();
    return carta;
}

// Valor numerico de una carta alfabetica (AH, QD, KC)
const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN( valor ) ) ? (valor === 'A')? 11 : 10: valor * 1;  
}

// Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do{
        const carta = pedirCarta();
        puntosComputador += valorCarta( carta );
        mostrarCarta( carta, computadorCarta );
        cambiarPuntaje( puntosComputador, 1 );

    }while( puntosComputador < puntosJugador );
    
}

// Referencias del html
const btnPedirCarta  = document.querySelector( '#btn-pedir-carta' );
const scoreTags = document.querySelectorAll('small');
const jugadorCarta = document.querySelector('#jugador-carta');
const computadorCarta = document.querySelector('#computador-carta');

const cambiarPuntaje = (valor, posicion) =>{

    scoreTags[posicion].textContent = valor
    

}

const mostrarCarta = (carta, mostrarCarta) =>{

    const imgCarta = document.createElement('img');

    imgCarta.className = 'carta';
    imgCarta.src = `./assets/cartas/${carta}.png`;


    mostrarCarta.append( imgCarta );


}


// Eventos
btnPedirCarta.addEventListener( 'click', () => {

    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    mostrarCarta(carta, jugadorCarta);
    cambiarPuntaje( puntosJugador , 0);

    // Borrar despues
    console.log( barajaMezclada );
    console.log( puntosJugador );

    if( puntosJugador > 21 ){

        btnPedirCarta.disabled = true;
        console.warn('has perdido');
    }else if( puntosJugador == 21){
        btnPedirCarta.disabled = true;
        console.info('21!, genial');
    }

} );

// btnNuevoJuego.addEventListener( 'click', () => {

    
// });

