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
                url = this.criaUrl(document.getElementById('code').value, document.getElementById('codein').value, document.getElementById('start_date').value);
            }
            console.log(url);
            this.pegaDados(url);
        },
        criaUrl(code, codein, date){
            //https://economia.awesomeapi.com.br/json/daily/USD-BRL?start_date=20240101&end_date=20240409 
            return 'https://economia.awesomeapi.com.br/json/daily/' + code + '-' + codein + '?start_date=' +  date.replace(/-/g, "") + '&end_date=' + date.replace(/-/g, "");
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
            this.name = '';
            fetch(url, {method: "GET",})
            .then(resp => resp.json())
            .then(data => {
                var lista = Object.keys(data).map(key => ({ key: key, text: data[key] }));

                if (lista.length == 0){
                    this.listaMoedas = [{'retorno' : 'Erro: Não encontrado'}];
                }

                for (var i = 0; i < lista.length; i++) {
                    item = lista[i]['text'];
                    console.log(lista)
                    
                    if(item['name'] == undefined && this.name == ''){
                        i = lista.length;
                        this.listaMoedas.push({'retorno' :  'Erro ' + lista[1]['text'] + ' : ' + lista[2]['text'] + ' (' + lista[0]['text'] + ').' });
                    } else{       
                        this.name = lista[0]['text']['name'];

                        this.listaMoedas.push({'retorno' : 
                        `$ ${item['low']} - ${item['high']} || ${new Date(item['timestamp']*1000).toLocaleDateString("pt-BR")}`
                        });
                    }
                }
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    
        }
    }
});
