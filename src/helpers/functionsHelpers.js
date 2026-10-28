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

export {
    quitaBlancosArray,
    // setAlerta,
    setAlertaTime
}