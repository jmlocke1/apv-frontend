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

function setAlertaTime(alerta, setAlertaState) {
    setAlertaState(alerta);
    setTimeout(() => {
        setAlertaState({})
    }, 3000);
}

export {
    quitaBlancosArray,
    setAlerta,
    setAlertaTime
}