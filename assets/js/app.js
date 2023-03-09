//  C = clover, trevol
//  D = Diamond, diamante
//  H = Hearts, corazon
//  S = Spades, pica

// Scores y baraja
let puntosComputador = 0;
let puntosJugador = 0;
let baraja = [];
// Referencias del html
const btnPedirCarta  = document.querySelector( '#btn-pedir-carta' );
const btnDetener = document.querySelector( '#btn-detener' );
const btnNuevoJuego = document.querySelector( '#btn-nuevo-juego' );
const scoreCompu = document.querySelector('#small-c');
const scoreJugador = document.querySelector('#small-j');
const jugadorCarta = document.querySelector('#jugador-carta');
const computadorCarta = document.querySelector('#computador-carta');
// Simbolos de las cartas
const tipos = 'CDHS';
const letras = 'AJQK';

// Esta funcion crea una baraja mezclada
const crearBaraja = ( ) =>{

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

// NUEVA BARAJA
let barajaMezclada = crearBaraja();

// PEDIR CARTA
const pedirCarta = () => {
    const carta = barajaMezclada.pop();
    return carta;
}

// VALOR CARTA
const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN( valor ) ) ? (valor === 'A')? 11 : 10: valor * 1;  
}

// MOSTRAR CARTAS
const mostrarCarta = (carta, mostrarCarta) =>{

    const imgCarta = document.createElement('img');

    imgCarta.className = 'carta';
    imgCarta.src = `./assets/cartas/${carta}.png`;

    mostrarCarta.append( imgCarta );
}

// TURNO COMPUTADORA
const turnoComputadora = ( puntosJugador ) => {

    do{
        const carta = pedirCarta();
        puntosComputador = puntosComputador + valorCarta( carta );
        mostrarCarta( carta, computadorCarta );
        cambiarPuntaje( puntosComputador, scoreCompu );

    }while( puntosComputador < puntosJugador &&
            puntosJugador <= 21);
    
}

// DEFINE AL GANADOR
const defineGanador = ( jugador, computador ) => {

    if( jugador < computador ){
        if( computador <= 21 ){
            alert('has perdido');
        }else{alert('Ganador');}

    }else if( computador < jugador ){
        if( jugador <= 21){
            alert('Ganador');
        }else{alert('Has perdido');}
    }else if( computador == jugador ){
        if( jugador <= 21 ){
            alert('Empate');
        }
    }
    else{
        alert('WTFFFF');
    }
}

// CAMBIAR PUNTAJE
const cambiarPuntaje = (valor, posicion) =>{
    posicion.innerText = valor;
}

//FUNCIONES BOTONES
// PEDIR CARTA
const botonPedirCarta = () => {
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    mostrarCarta(carta, jugadorCarta);
    cambiarPuntaje( puntosJugador ,scoreJugador );

    if( puntosJugador > 21 ){

        btnPedirCarta.disabled = true;
        console.warn('has perdido');
        botonDetener();
        
    }else if( puntosJugador == 21 ){
        btnPedirCarta.disabled = true;
        console.info('21!, genial');
        botonDetener();
    }
}

// DETENER
const botonDetener = () => {

    btnPedirCarta.disabled = true;
    turnoComputadora( puntosJugador );
    btnDetener.disabled = true;

    setTimeout( () => defineGanador( puntosJugador, puntosComputador ), 200);
}

// NUEVO JUEGO
const botonNuevoJuego = () => {

    // Crear baraja
    barajaMezclada = [];
    barajaMezclada = crearBaraja();
    // borrar cartas
    jugadorCarta.innerHTML = '';
    computadorCarta.innerHTML = '';
    // reiniciar marcadores
    puntosComputador = 0;
    puntosJugador = 0;
    cambiarPuntaje( 0, scoreJugador );
    cambiarPuntaje( 0, scoreCompu );
    scoreCompu.innerHTML = '0';
    scoreJugador.innerHTML = '0';
    // Habilitar botones
    btnDetener.disabled = false;
    btnPedirCarta.disabled = false;
}


// EVENTOS BOTONES
btnPedirCarta.addEventListener( 'click', botonPedirCarta );

btnDetener.addEventListener( 'click', () => botonDetener() );

btnNuevoJuego.addEventListener( 'click', () => botonNuevoJuego() );


