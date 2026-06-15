// ======================
// BASE DE DADOS
// ======================

const dados = [
    {id:301, transportadora:"RotaMax", regiao:"Sudeste", prazo:3, real:7},
    {id:302, transportadora:"ViaCargo", regiao:"Sul", prazo:5, real:5},
    {id:303, transportadora:"FlashLog", regiao:"Nordeste", prazo:4, real:9},
    {id:304, transportadora:"RotaMax", regiao:"Norte", prazo:6, real:4},
    {id:305, transportadora:"ViaCargo", regiao:"Centro-Oeste", prazo:2, real:6},
    {id:306, transportadora:"FlashLog", regiao:"Sul", prazo:5, real:12},
    {id:307, transportadora:"RotaMax", regiao:"Sul", prazo:6, real:9},
    {id:308, transportadora:"ViaCargo", regiao:"Sudeste", prazo:3, real:4},
    {id:309, transportadora:"FlashLog", regiao:"Norte", prazo:5, real:5},
    {id:310, transportadora:"ViaCargo", regiao:"Nordeste", prazo:4, real:8}
];

// ======================
// FILTROS
// ======================

const filtroRegiao = document.getElementById("filtroRegiao");
const filtroTransportadora = document.getElementById("filtroTransportadora");

const regioes = [...new Set(dados.map(d => d.regiao))];
const transportadoras = [...new Set(dados.map(d => d.transportadora))];

regioes.forEach(regiao => {
    filtroRegiao.innerHTML += `<option value="${regiao}">${regiao}</option>`;
});

transportadoras.forEach(transp => {
    filtroTransportadora.innerHTML += `<option value="${transp}">${transp}</option>`;
});

// ======================
// GRÁFICOS
// ======================

let graficoTransportadoras;
let graficoRegioes;
let graficoRanking;
let graficoTendencia;

// ======================
// EVENTOS
// ======================

filtroRegiao.addEventListener("change", atualizarDashboard);
filtroTransportadora.addEventListener("change", atualizarDashboard);

atualizarDashboard();

// ======================
// DASHBOARD
// ======================

function atualizarDashboard(){

    const regiao = filtroRegiao.value;
    const transportadora = filtroTransportadora.value;

    let dadosFiltrados = dados.filter(item => {

        const filtro1 =
            regiao === "Todos" ||
            item.regiao === regiao;

        const filtro2 =
            transportadora === "Todos" ||
            item.transportadora === transportadora;

        return filtro1 && filtro2;
    });

    gerarKPIs(dadosFiltrados);
    gerarAlertas(dadosFiltrados);
    gerarTabela(dadosFiltrados);
    gerarGraficos(dadosFiltrados);
}

// ======================
// KPIs
// ======================

function gerarKPIs(lista){

    const atrasadas =
        lista.filter(item => item.real > item.prazo);

    const percentual =
        lista.length > 0
        ? ((atrasadas.length / lista.length) * 100).toFixed(1)
        : 0;

    const maiorAtraso =
        atrasadas.length > 0
        ? Math.max(...atrasadas.map(i => i.real - i.prazo))
        : 0;

    document.getElementById("totalEntregas").textContent =
        lista.length;

    document.getElementById("entregasAtrasadas").textContent =
        atrasadas.length;

    document.getElementById("percentualAtraso").textContent =
        percentual + "%";

    document.getElementById("maiorAtraso").textContent =
        maiorAtraso + " dias";
}

// ======================
// ALERTAS
// ======================

function gerarAlertas(lista){

    const ul = document.getElementById("listaAlertas");

    ul.innerHTML = "";

    const atrasadas =
        lista.filter(item => item.real > item.prazo);

    if(atrasadas.length === 0){

        ul.innerHTML =
            "<li>🟢 Nenhum atraso identificado.</li>";

        return;
    }

    const piorEntrega =
        [...atrasadas].sort(
            (a,b)=>
            (b.real-b.prazo) -
            (a.real-a.prazo)
        )[0];

    ul.innerHTML += `
        <li>
        🔴 Entrega ${piorEntrega.id}
        possui atraso de
        ${piorEntrega.real - piorEntrega.prazo} dias.
        </li>
    `;

    const contagemTransportadora = {};

    atrasadas.forEach(item => {

        contagemTransportadora[item.transportadora] =
        (contagemTransportadora[item.transportadora] || 0) + 1;

    });

    const piorTransportadora =
        Object.keys(contagemTransportadora)
        .sort((a,b)=>
            contagemTransportadora[b] -
            contagemTransportadora[a]
        )[0];

    ul.innerHTML += `
        <li>
        🚚 Transportadora mais crítica:
        ${piorTransportadora}
        </li>
    `;

    const contagemRegiao = {};

    atrasadas.forEach(item => {

        contagemRegiao[item.regiao] =
        (contagemRegiao[item.regiao] || 0) + 1;

    });

    const piorRegiao =
        Object.keys(contagemRegiao)
        .sort((a,b)=>
            contagemRegiao[b] -
            contagemRegiao[a]
        )[0];

    ul.innerHTML += `
        <li>
        📍 Região mais crítica:
        ${piorRegiao}
        </li>
    `;
}

// ======================
// TABELA
// ======================

function gerarTabela(lista){

    const tbody =
        document.getElementById("tabelaAtrasos");

    tbody.innerHTML = "";

    lista
    .filter(item => item.real > item.prazo)
    .sort((a,b)=>
        (b.real-b.prazo) -
        (a.real-a.prazo)
    )
    .forEach(item => {

        const atraso =
            item.real - item.prazo;

        let prioridade = "Baixa";
        let classe = "prioridade-baixa";

        if(atraso >= 5){
            prioridade = "Alta";
            classe = "prioridade-alta";
        }
        else if(atraso >= 3){
            prioridade = "Média";
            classe = "prioridade-media";
        }

        tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.transportadora}</td>
            <td>${item.regiao}</td>
            <td>${item.prazo}</td>
            <td>${item.real}</td>
            <td>${atraso}</td>
            <td class="${classe}">
                ${prioridade}
            </td>
        </tr>
        `;
    });
}

// ======================
// GRÁFICOS
// ======================

function gerarGraficos(lista){

    const atrasadas =
        lista.filter(item => item.real > item.prazo);

    gerarGraficoTransportadoras(atrasadas);
    gerarGraficoRegioes(atrasadas);
    gerarGraficoRanking(atrasadas);
    gerarGraficoTendencia(atrasadas);
}

function gerarGraficoTransportadoras(atrasadas){

    const dadosGrafico = {};

    atrasadas.forEach(item => {

        dadosGrafico[item.transportadora] =
        (dadosGrafico[item.transportadora] || 0) + 1;

    });

    if(graficoTransportadoras){
        graficoTransportadoras.destroy();
    }

    graficoTransportadoras = new Chart(
        document.getElementById("graficoTransportadoras"),
        {
            type:"bar",
            data:{
                labels:Object.keys(dadosGrafico),
                datasets:[{
                    label:"Quantidade de Atrasos",
                    data:Object.values(dadosGrafico)
                }]
            }
        }
    );
}

function gerarGraficoRegioes(atrasadas){

    const dadosGrafico = {};

    atrasadas.forEach(item => {

        dadosGrafico[item.regiao] =
        (dadosGrafico[item.regiao] || 0) + 1;

    });

    if(graficoRegioes){
        graficoRegioes.destroy();
    }

    graficoRegioes = new Chart(
        document.getElementById("graficoRegioes"),
        {
            type:"doughnut",
            data:{
                labels:Object.keys(dadosGrafico),
                datasets:[{
                    data:Object.values(dadosGrafico)
                }]
            }
        }
    );
}

function gerarGraficoRanking(atrasadas){

    if(graficoRanking){
        graficoRanking.destroy();
    }

    const ranking =
        [...atrasadas].sort(
            (a,b)=>
            (b.real-b.prazo) -
            (a.real-a.prazo)
        );

    graficoRanking = new Chart(
        document.getElementById("graficoRanking"),
        {
            type:"bar",
            data:{
                labels: ranking.map(i => "Entrega " + i.id),
                datasets:[{
                    label:"Dias de Atraso",
                    data: ranking.map(
                        i => i.real - i.prazo
                    )
                }]
            },
            options:{
                indexAxis:"y"
            }
        }
    );
}

function gerarGraficoTendencia(atrasadas){

    if(graficoTendencia){
        graficoTendencia.destroy();
    }

    graficoTendencia = new Chart(
        document.getElementById("graficoTendencia"),
        {
            type:"line",
            data:{
                labels: atrasadas.map(i => i.id),
                datasets:[{
                    label:"Dias de atraso",
                    data: atrasadas.map(
                        i => i.real - i.prazo
                    ),
                    tension:0.4
                }]
            }
        }
    );
}
