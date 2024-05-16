new Vue({
    el: '#app',
    data: {
        URLlistaMoedas: 'https://economia.awesomeapi.com.br/json/available/uniq',
        listaMoedas: [
            { id: 1, text: 'Primeiro item' },
            { id: 2, text: 'Segundo item' },
            { id: 3, text: 'Terceiro item' },
            { id: 4, text: 'Quarto item' }
        ],
        opcoes : [],
        ultimoAtivo : false,
    },
    created() {
        fetch(this.URLlistaMoedas, {method: "GET",})
        .then(resp => resp.json())
        .then(data => {
            this.opcoes = Object.keys(data).map(key => ({ key: key, text: data[key] }));
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    },
    methods: {
        pegaFiltros() {
            const ultimo = document.getElementById('last').checked;

            let url;
            if (document.getElementById('last').checked) {
                // se last estiver ativo
                url = criaUrlUltimo(document.getElementById('code').value, document.getElementById('codein').value):
            } else {
                url = criaUrl(document.getElementById('code').value, document.getElementById('codein').value, document.getElementById('start_date').value, document.getElementById('end_date').value);
            }

            this.pegaDados(url);
        },
        criaUrl(code, codein, start_date, end_date){
            return "";
        },
        criaUrlUltimo(code, codein){
            return "";
        },
        pegaDados(url) {
            fetch(url, {method: "GET",})
            .then(resp => resp.json())
            .then(data => {
                console.log(Object.keys(data).map(key => ({ key: key, text: data[key] })));
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    
        }
    }
});
