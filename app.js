// Obtener elementos del DOM
const inputTexto = document.querySelector('.presentacion__input');
const botonEncriptar = document.querySelector('.presentacion__botones__encriptar');
const botonDesencriptar = document.querySelector('.presentacion__botones__desencriptar');
const botonCopiar = document.querySelector('.copiar__boton');

// Función para validar el texto ingresado
function validarTexto(texto) {
    const regex = /^[a-z!\s]+$/; // Solo permite letras minúsculas y espacios
    if (!regex.test(texto)) {
        mostrarAlertaInvalida();
        return false;
    }
    return true;
}

// Función para mostrar la alerta personalizada
function mostrarAlertaInvalida() {
    const alertaInvalida = document.createElement('div');
    alertaInvalida.classList.add('alerta-invalida');
    alertaInvalida.textContent = 'El texto ingresado contiene caracteres inválidos. Solo se permiten letras minúsculas, sin tildes ni caracteres especiales.';
    document.body.appendChild(alertaInvalida);

    setTimeout(() => {
        alertaInvalida.remove();
    }, 4000); // Duración de la alerta (4 segundos)
}

// Función para encriptar el texto
function encriptarTexto(texto) {
    const reemplazos = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' };
    return texto.replace(/[eioua]/g, letra => reemplazos[letra]);
}

// Función para desencriptar el texto
function desencriptarTexto(texto) {
    const reemplazos = { 'enter': 'e', 'imes': 'i', 'ai': 'a', 'ober': 'o', 'ufat': 'u' };
    return texto.replace(/enter|imes|ai|ober|ufat/g, grupo => reemplazos[grupo]);
}

// Función para copiar al portapapeles y mostrar alerta
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        const alertaCopiado = document.createElement('div');
        alertaCopiado.classList.add('alerta-copiado');
        alertaCopiado.textContent = "Texto copiado al portapapeles";
        document.body.appendChild(alertaCopiado);

        setTimeout(() => {
            alertaCopiado.remove();
        }, 3000); // Duración de la alerta (3 segundos)
    }).catch(err => {
        console.error('Error al copiar al portapapeles:', err);
    });
}

// Función para mostrar la respuesta en el DOM
function mostrarRespuesta(texto) {
    const tituloRespuesta = document.querySelector('.titulo');
    const subtituloRespuesta = document.querySelector('.subtitulo');
    const imagenMuñeco = document.querySelector('.imagen__muñeco');

    tituloRespuesta.textContent = texto;
    subtituloRespuesta.textContent = '';
    imagenMuñeco.style.display = 'none';

    botonCopiar.style.display = 'block'; // Mostrar el botón de copiar
}

// Función para ocultar el botón de copiar si no hay texto
function ocultarBotonCopiar() {
    botonCopiar.style.display = 'none'; // Oculta el botón de copiar
}

// Función para resetear el input y mostrar el placeholder
function resetearInput() {
    inputTexto.value = ''; // Limpia el texto del área de entrada
    inputTexto.placeholder = 'Ingrese el texto aquí...'; // Restaura el placeholder
}

// Asignar eventos a los botones
botonEncriptar.addEventListener('click', () => {
    if (inputTexto.value.trim() !== "" && validarTexto(inputTexto.value)) {
        const textoEncriptado = encriptarTexto(inputTexto.value);
        mostrarRespuesta(textoEncriptado);
    }
    resetearInput();
});

botonDesencriptar.addEventListener('click', () => {
    if (inputTexto.value.trim() !== "" && validarTexto(inputTexto.value)) {
        const textoDesencriptado = desencriptarTexto(inputTexto.value);
        mostrarRespuesta(textoDesencriptado);
    }
    resetearInput();
});

botonCopiar.addEventListener('click', () => {
    copiarAlPortapapeles(document.querySelector('.titulo').textContent);
});

// Ocultar el botón de copiar al iniciar
ocultarBotonCopiar();

