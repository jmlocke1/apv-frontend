function quitaBlancosArray( miArray ) {
    const limpio = miArray
        .map( item => typeof item === "string" ? item.trim() : item )
    
    return limpio;
}


function setAlertaTime(alerta, setAlertaState, time = 3000) {
    setAlertaState(alerta);
    setTimeout(() => {
        setAlertaState({})
    }, time);
}

function formatearFecha(fecha) {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
}

export {
    quitaBlancosArray,
    // setAlerta,
    setAlertaTime,
    formatearFecha
}