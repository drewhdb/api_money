new Vue({
    el: '#app',
    data: {
        URLlistaMoedas: 'https://economia.awesomeapi.com.br/json/available/uniq',
        listaMoedas: [],
        name : '',
        opcoes : [],
        ultimoAtivo : false,
    },
    created() {
        fetch(this.URLlistaMoedas, {method: "GET",})
        .then(resp => resp.json())
        .then(data => {
            this.opcoes = Object.keys(data).map(key => ({ key: key, text: data[key] }));
            this.opcoes = this.opcoes.filter(item => item.key !== 'BRL');
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    },
    methods: {
        pegaFiltros() {
            let url;
            if (document.getElementById('last').checked && document.getElementById('dias').value == 1) {
                // se last estiver ativo
                url = this.criaUrlUltimo(document.getElementById('code').value, document.getElementById('codein').value);
            } else if (document.getElementById('last').checked){
                url = this.criaUrlDias(document.getElementById('code').value, document.getElementById('codein').value, document.getElementById('dias').value);
            
            } else {
                url = this.criaUrl(document.getElementById('code').value, document.getElementById('codein').value, document.getElementById('start_date').value, document.getElementById('end_date').value);
            }
            console.log(url);
            this.pegaDados(url);
        },
        criaUrl(code, codein, start_date, end_date){
            //https://economia.awesomeapi.com.br/json/daily/USD-BRL?start_date=20240101&end_date=20240409 

            start_date = start_date.replace(/-/g, "");
            end_date = end_date.replace(/-/g, "");

            return 'https://economia.awesomeapi.com.br/json/daily/' + code + '-' + codein + '?start_date=' +  start_date + '&end_date=' + end_date;
        },
        criaUrlUltimo(code, codein){
            //https://economia.awesomeapi.com.br/json/last/BTC-BRL
            return 'https://economia.awesomeapi.com.br/json/last/' + code + '-' + codein;
        },
        criaUrlDias(code, codein, dias){
            //https://economia.awesomeapi.com.br/json/last/BTC-BRL?2
            return 'https://economia.awesomeapi.com.br/json/daily/' + code + '-' + codein + '/' + dias;
        },
        pegaDados(url) {
            this.listaMoedas = [];
            fetch(url, {method: "GET",})
            .then(resp => resp.json())
            .then(data => {
                var lista = Object.keys(data).map(key => ({ key: key, text: data[key] }));
                cont = 0;
                for (var i = 0; i < lista.length; i++) {
                    item = lista[i]['text'];
                    if(cont == 0){this.name = item['name']; cont++;}

                    let low = item['low'];
                    let high = item['high'];
                    let timestamp = item['timestamp'];
                    obj = {'low': low, 'high': high, 'date': new Date(timestamp*1000).toLocaleDateString("pt-BR")};
                    
                    this.listaMoedas.push(obj);
                }
                console.log(this.listaMoedas);

            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    
        }
    }
});
