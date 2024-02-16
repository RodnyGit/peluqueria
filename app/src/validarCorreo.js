function validarCorreo(email) {
    const validacion = {
        longitud: false,
        arroba: false,
        puntos: false,
        estructura: false
    };

    function contarCaracter(arreglo, caracter) {
        const res = arreglo.filter(c => c == caracter)
        return res.length;
    }

    function validarEstructura(arreglo) {
        const separacionArroba = arreglo.split('@');
        if (separacionArroba[0].length > 0) {
            if (separacionArroba[1]) {
                const separacionPorPunto = separacionArroba[1].split('.');
                if (separacionPorPunto.length > 1) {
                    let res = 0
                    separacionPorPunto.forEach(entrePuntos => {
                        if (entrePuntos.length < 2) {
                            res++;
                        }
                    });
                    if (res == 0) {
                        return true
                    }
                }
            }
        }
        return false;
    }

    const arregloTexto = email.split('');
    validacion.longitud = email.length >= 6;
    validacion.arroba = contarCaracter(arregloTexto, '@') == 1;
    validacion.puntos = contarCaracter(arregloTexto, '.') >= 1;
    validacion.estructura = validarEstructura(email);    
    return validacion;
}

export { validarCorreo };