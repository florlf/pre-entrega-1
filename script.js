console.log("El archivo JavaScript se ha cargado correctamente.");
function ejecutarSimuladorDeGastos() {
    let continuarEjecucion = true;

    while (continuarEjecucion) {
        // Solicita el ingreso mensual
        const ingresoInput = prompt("Ingrese su ingreso mensual:");
        console.log(`Ingreso ingresado: ${ingresoInput}`);

        if (ingresoInput === null) {
            const cancelar = confirm("Se canceló el cuestionario. ¿Desea salir?");
            if (cancelar) {
                alert("Gracias por usar el simulador.");
                return;
            } else {
                continue;
            }
        }

        const ingreso = parseFloat(ingresoInput);
        console.log(`Ingreso convertido a número: ${ingreso}`);

        // Verifica si el ingreso es válido
        if (isNaN(ingreso) || ingreso <= 0) {
            alert("Por favor, ingrese un ingreso válido.");
            continue;
        }

        // Solicita los gastos de diferentes categorías
        const categorias = ["alquiler", "comida", "transporte", "otros"];
        const gastosTotales = []; // Array para almacenar los gastos ingresados

        for (let i = 0; i < categorias.length; i++) {
            let gastoValido = false;
            let gasto;

            while (!gastoValido) {
                gasto = prompt(`Ingrese el monto para ${categorias[i]}:`);
                console.log(`Monto ingresado para ${categorias[i]}: ${gasto}`);

                // Verifica si el usuario canceló el prompt
                if (gasto === null) {
                    const cancelar = confirm("Se canceló la entrada de datos. ¿Desea salir?");
                    if (cancelar) {
                        alert("Gracias por usar el simulador.");
                        return;
                    } else {
                        continue;
                    }
                }

                gasto = parseFloat(gasto);

                // Verifica si el gasto es un número válido y no negativo
                if (!isNaN(gasto) && gasto >= 0) {
                    gastoValido = true;
                } else {
                    alert("Por favor, ingrese un monto de gasto válido (número positivo)");
                }
            }

            gastosTotales.push(gasto); // Agrega el gasto al array
            console.log(`Gastos ingresados hasta ahora: ${gastosTotales}`);
        }

        // Calcula el total de gastos y el saldo restante
        const totalGastos = calcularTotalGastos(gastosTotales);
        console.log(`Total de gastos: ${totalGastos}`);
        const saldo = ingreso - totalGastos;
        console.log(`Saldo restante: ${saldo}`);

        // Muestra los resultados al usuario
        if (saldo >= 0) {
            alert(`Su presupuesto mensual está en equilibrio. Saldo restante: $${saldo.toFixed(2)}`);
        } else {
            alert(`Está excediendo su presupuesto. Déficit: $${Math.abs(saldo).toFixed(2)}`);
        }

        continuarEjecucion = confirm("¿Desea realizar otra consulta?");
        console.log(`¿Desea realizar otra consulta? Respuesta: ${continuarEjecucion}`);
    }
}


function calcularTotalGastos(gastosTotales) {
    let total = 0;

    // Suma todos los gastos
    for (let i = 0; i < gastosTotales.length; i++) {
        total += gastosTotales[i];
    }

    return total;
}

window.addEventListener('load', ejecutarSimuladorDeGastos);