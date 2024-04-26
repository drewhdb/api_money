function trataConsultarBtn() {
    // Apresenta GIF de "loading"
    document.getElementById('loadingDiv').innerHTML = '<img id="loadingImg" style="width:30px" src="https://i.gifer.com/ZKZg.gif">';

    limpaResultados();
    
    const palavra = document.getElementById("inputPalavra").value;
    const urlWord = `https://api.dicionario-aberto.net/word/${palavra}`;
    fetch(urlWord, {
        method : "GET",
    })
    .then( (resp) => resp.json() )
    .then( (data) => {
        //tratar o resultado "data" no formato json
        apresentaResultadoWord(data);
    })

}

function apresentaResultadoWord(data) {
    // Remove GIF de "loading"
    document.getElementById('loadingDiv').innerHTML = '';

    var conteudo;
    if(data.length == 0) {
        conteudo = 'Não foram encontradas definições para este termo!'
    }
    else {
        conteudo = '<strong>Definições:</strong><br><br>';
        for (let index = 0; index < data.length; index++) {
            const definicao = data[index];
            conteudo += definicao.xml + '<br><br>';
        }
    }
    const elem = document.getElementById('wordResponse');
    elem.innerHTML = conteudo;
}

function trataLimparBtn() {
    limpaInputs();
    limpaResultados();
}

function limpaInputs() {
    document.getElementById("inputPalavra").value = '';
}

function limpaResultados() {
    document.getElementById("wordResponse").innerHTML = ''
}
