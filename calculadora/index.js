const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const historialElement = document.getElementById('historial');
const textContainer = document.getElementById('animated-text');
const originalText = "$-Calcualadora-$";

function animateText() {
    textContainer.textContent = '';
    for (let i = 0; i < originalText.length; i++) {
        setTimeout(() => {
            textContainer.textContent += originalText[i];
        }, i * 300);
    }

    setTimeout(() => {
        animateText();
    }, 9000);
}
animateText();
const display = new Display(displayValorAnterior, displayValorActual, historialElement);

botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))

});

