class SimuladorGastos {
    constructor() {
        // Inicializo el ingreso y las categorías de gastos con 0
        this.ingreso = 0;
        this.gastos = {
            alquiler: 0,
            comida: 0,
            transporte: 0,
            otros: 0
        };
    }

    // Establezco el ingreso y guardo los datos en localStorage
    setIngreso(ingreso) {
        this.ingreso = ingreso;
        this.guardarDatos();
    }

    // Método para agregar un gasto en la categoría especificada
    agregarGasto(categoria, gasto) {
        this.gastos[categoria] += gasto;
        this.guardarDatos();
    }

    calcularTotalGastos() {
        return Object.values(this.gastos).reduce((total, gasto) => total + gasto, 0);
    }

    calcularSaldo() {
        return this.ingreso - this.calcularTotalGastos();
    }

    // Método para guardar los datos en localStorage
    guardarDatos() {
        const datos = {
            ingreso: this.ingreso,
            gastos: this.gastos,
        };
        localStorage.setItem('datosFinancieros', JSON.stringify(datos));
    }

    // Método para recuperar los datos de localStorage
    recuperarDatos() {
        const datos = JSON.parse(localStorage.getItem('datosFinancieros'));
        if (datos) {
            this.ingreso = datos.ingreso;
            this.gastos = datos.gastos;
        }
    }

    // Método para reiniciar los datos
    reiniciarDatos() {
        this.ingreso = 0;
        this.gastos = {
            alquiler: 0,
            comida: 0,
            transporte: 0,
            otros: 0
        };
        localStorage.removeItem('datosFinancieros');
    }
}

// Función para iniciar el simulador
function inicializarSimulador() {
    const simulador = new SimuladorGastos();
    simulador.recuperarDatos();

    const ingresoInput = document.getElementById('ingreso');
    const gastoInput = document.getElementById('gasto');
    const categoriaSelect = document.getElementById('categoria');
    const botonIngreso = document.getElementById('agregarIngreso');
    const botonGasto = document.getElementById('agregarGasto');
    const botonReiniciar = document.getElementById('reiniciar');
    const resultadoDiv = document.getElementById('resultado');

    botonIngreso.addEventListener('click', () => {
        const ingreso = parseFloat(ingresoInput.value);
        if (!isNaN(ingreso) && ingreso > 0) {
            simulador.setIngreso(ingreso);
            resultadoDiv.innerText = `Ingreso registrado: $${ingreso.toFixed(2)}`;
            ingresoInput.value = '';
        } else {
            resultadoDiv.innerText = 'Por favor, ingrese un presupuesto válido.';
        }
    });

    botonGasto.addEventListener('click', () => {
        // Verifico si el ingreso se estableció
        if (simulador.ingreso === 0) {
            resultadoDiv.innerText = 'Por favor, primero ingrese un presupuesto.';
            return; // Se sale de la función si no hay ingreso
        }

        const gasto = parseFloat(gastoInput.value);
        const categoria = categoriaSelect.value;

        if (!isNaN(gasto) && gasto >= 0) {
            simulador.agregarGasto(categoria, gasto);
            const totalGastos = simulador.calcularTotalGastos();
            const saldo = simulador.calcularSaldo();

            let estado = saldo >= 0 ? 'Su presupuesto está equilibrado.' : `Está en déficit de $${Math.abs(saldo).toFixed(2)}.`;
            resultadoDiv.innerText = `Gasto en ${categoria}: $${gasto.toFixed(2)}. Total de gastos: $${totalGastos.toFixed(2)}. Saldo: $${saldo.toFixed(2)}. ${estado}`;
            gastoInput.value = '';
        } else {
            resultadoDiv.innerText = 'Por favor, ingrese un monto de gasto válido.';
        }
    });

    // Evento para reiniciar el simulador si el usuario quiere realizar una nueva consulta
    botonReiniciar.addEventListener('click', () => {
        simulador.reiniciarDatos();
        resultadoDiv.innerText = 'Simulador reiniciado. Puede ingresar nuevos datos.';
    });
}

document.addEventListener('DOMContentLoaded', inicializarSimulador);