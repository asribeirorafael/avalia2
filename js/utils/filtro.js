/**
 * Created by João on 17/10/2014.
 */
var cidadesEstados = {},
    cidades = escopoGlobal.listaCidades,
    numeroCidades = cidades.length,
    indiceCidade,
    cidade,
    cidadeEstado;

for (indiceCidade = 0; indiceCidade < numeroCidades; indiceCidade++) {
    cidade = cidades[indiceCidade];
    cidadeEstado = cidadesEstados[cidade.estado];
    if (!cidadeEstado) {
        cidadeEstado[cidade.estado] = [];
    }
    cidadeEstado[cidade.estado] = cidade;
}

console.log(cidadesEstados);



