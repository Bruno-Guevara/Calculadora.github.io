class Display {
    constructor(displayValorAnterior, displayValorActual, historialElement) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoDeOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'x',
            dividir: '%'
        }
        this.operaciones = [];
        this.historialElement = historialElement;
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = "";
        this.valorAnterior = "";
        this.tipoDeOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        this.tipoDeOperacion && this.calcular();
        this.tipoDeOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if (numero === "." && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoDeOperacion] || ''}`;
    }


    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if (isNaN(valorAnterior) || isNaN(valorActual)) return;

        let resultado;
        switch (this.tipoDeOperacion) {
            case 'sumar':
                resultado = this.calculador.sumar(valorAnterior, valorActual);
                break;
            case 'restar':
                resultado = this.calculador.restar(valorAnterior, valorActual);
                break;
            case 'multiplicar':
                resultado = this.calculador.multiplicar(valorAnterior, valorActual);
                break;
            case 'dividir':
                resultado = this.calculador.dividir(valorAnterior, valorActual);
                break;
            default:
                return;
        }

        const operacion = `${valorAnterior} ${this.signos[this.tipoDeOperacion]} ${valorActual} = ${resultado}`;
        this.operaciones.push(operacion);
        this.actualizarHistorial();
        this.valorActual = resultado.toString();
    }

    actualizarHistorial() {
        this.historialElement.innerHTML = this.operaciones.map(operacion => `<div class="historial-item">${operacion}</div>`).join('');
    }

}

