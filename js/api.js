//listar as moedas no select
const URLlistaMoedas = 'https://economia.awesomeapi.com.br/json/available/uniq';
var listaMoedas;

fetch(URLlistaMoedas, {
    method : "GET",
})
.then( (resp) => resp.json() )
.then( (data) => {
    listaMoedas = Object.keys(data);
    for (var index = 0; index < listaMoedas.length; index++) {
    }
})

var de = document.getElementById('code');
var para = document.getElementById('codein');
var periodo = document.getElementById('start_date');
var ate = document.getElementById('end_date');
var ultimo = document.getElementById('last');


//pegar a função do sor pra depois do submit da consulta executar isso
function confereLast() {
    if (ultimo.checked == true) {
        //se last estiver ativo
        console.log('oiii');
    } else{
        //testa se o periodo e o até está ok
    }
}
