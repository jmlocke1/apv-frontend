function quitaBlancosArray( miArray ) {
    const limpio = miArray
        .map( item => typeof item === "string" ? item.trim() : item )
    
    return limpio;
}

function setAlerta(alerta) {
    setAlertaState(alerta);
    setTimeout(() => {
        setAlertaState({})
    }, 3000);
}

export {
    quitaBlancosArray,
    setAlerta
}