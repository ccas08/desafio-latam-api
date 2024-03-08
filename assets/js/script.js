document.getElementById('convertir').addEventListener('click', function() {
    let cantidad = document.getElementById('cantidad').value;
    let monedaSeleccionada = document.getElementById('moneda').value;

    if(cantidad && monedaSeleccionada) {
        convertirMoneda(cantidad, monedaSeleccionada);
    } else {
        alert("Por favor, ingrese un monto y seleccione una moneda.");
    }
});

function convertirMoneda(monto, moneda) {
    console.log(moneda)
    const url = `https://mindicador.cl/api/${moneda}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let valor = data.serie[0].valor; // Obtener el último valor
            let resultado = monto / valor;
            document.getElementById('resultado').innerText = `Resultado: ${resultado.toFixed(2)} ${moneda}`;
        })
        .catch(e => {
            console.error(e);
           
            document.getElementById('resultado').innerText = "La API no está disponible en este momento. Intente más tarde o use la versión offline.";
        });
}