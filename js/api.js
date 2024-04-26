//listar as moedas no select
const URLlistaMoedas = 'https://economia.awesomeapi.com.br/json/available/uniq';
let listaMoedas;

fetch(URLlistaMoedas, {
    method : "GET",
})
.then( (resp) => resp.json() )
.then( (data) => {
    //tratar o resultado "data" no formato json
    listaMoedas = [data];
})

// testar se os tipos de money estão ok
// if (de & para){ 

//     if () {
//         //  se last estiver ativo
        
//     } else{
//         //testa se o periodo e o até está ok

//     }
// } else {
//     // erro
// }