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
            const de = document.getElementById('code').value;
            const para = document.getElementById('codein').value;
            const ultimo = document.getElementById('last').checked;

            let url;
            if (ultimo) {
                // se last estiver ativo
                url = `https://economia.awesomeapi.com.br/json/last/${de}-${para}`;
            } else {
                const periodo = document.getElementById('start_date').value;
                const ate = document.getElementById('end_date').value;

                url = `https://economia.awesomeapi.com.br/json/daily/${de}-${para}?start_date=${periodo}&end_date=${ate}`;
            }

            this.pegaDados(url);
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
