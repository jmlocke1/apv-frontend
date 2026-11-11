function trimObjeto(dato) {
    if (typeof dato === 'string') {
        return dato.trim();
    }

    if (Array.isArray(dato)) {
        return dato.map(trimObjeto);
    }

    if (dato !== null && typeof dato === 'object') {
        return Object.fromEntries(
            Object.entries(dato).map(([clave, valor]) => [clave, trimObjeto(valor)])
        );
    }

    return dato;
}


function setAlertaTime(alerta, setAlertaState, time = 3000) {
    setAlertaState(alerta);
    setTimeout(() => {
        setAlertaState({})
    }, time);
}

function formatearFecha(fecha) {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha);
}

export {
    trimObjeto,
    // setAlerta,
    setAlertaTime,
    formatearFecha
}

