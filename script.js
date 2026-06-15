const dados = [
{ id:301, transportadora:"RotaMax", regiao:"Sudeste", prazo:3, real:7 },
{ id:302, transportadora:"ViaCargo", regiao:"Sul", prazo:5, real:5 },
{ id:303, transportadora:"FlashLog", regiao:"Nordeste", prazo:4, real:9 },
{ id:304, transportadora:"RotaMax", regiao:"Norte", prazo:6, real:4 },
{ id:305, transportadora:"ViaCargo", regiao:"Centro-Oeste", prazo:2, real:6 },
{ id:306, transportadora:"FlashLog", regiao:"Sul", prazo:5, real:12 },
{ id:307, transportadora:"RotaMax", regiao:"Sul", prazo:6, real:9 },
{ id:308, transportadora:"ViaCargo", regiao:"Sudeste", prazo:3, real:4 },
{ id:309, transportadora:"FlashLog", regiao:"Norte", prazo:5, real:5 },
{ id:310, transportadora:"ViaCargo", regiao:"Nordeste", prazo:4, real:8 }
];

const atrasadas = dados.filter(item => item.real > item.prazo);

document.getElementById("totalEntregas").textContent = dados.length;
document.getElementById("entregasAtrasadas").textContent = atrasadas.length;

document.getElementById("percentualAtraso").textContent =
((atrasadas.length / dados.length) * 100).toFixed(1) + "%";

const maiorAtraso = Math.max(
...atrasadas.map(item => item.real - item.prazo)
);

document.getElementById("maiorAtraso").textContent =
maiorAtraso + " dias";

const tabela = document.getElementById("tabelaEntregas");

dados.forEach(item => {

    const atraso = item.real - item.prazo;

    let classe = "normal";

    if(atraso > 5){
        classe = "critico";
    }
    else if(atraso > 0){
        classe = "atencao";
    }

    tabela.innerHTML += `
    <tr class="${classe}">
        <td>${item.id}</td>
        <td>${item.transportadora}</td>
        <td>${item.regiao}</td>
        <td>${item.prazo}</td>
        <td>${item.real}</td>
        <td>${atraso}</td>
    </tr>
    `;
});

const transportadoras = {};

atrasadas.forEach(item => {
    transportadoras[item.transportadora] =
    (transportadoras[item.transportadora] || 0) + 1;
});

new Chart(
document.getElementById("graficoTransportadoras"),
{
    type:"bar",
    data:{
        labels:Object.keys(transportadoras),
        datasets:[{
            label:"Atrasos",
            data:Object.values(transportadoras)
        }]
    }
});

const regioes = {};

atrasadas.forEach(item => {
    regioes[item.regiao] =
    (regioes[item.regiao] || 0) + 1;
});

new Chart(
document.getElementById("graficoRegioes"),
{
    type:"doughnut",
    data:{
        labels:Object.keys(regioes),
        datasets:[{
            data:Object.values(regioes)
        }]
    }
});

const ranking = [...atrasadas].sort(
(a,b)=>(b.real-b.prazo)-(a.real-a.prazo)
);

new Chart(
document.getElementById("graficoRanking"),
{
    type:"bar",
    data:{
        labels: ranking.map(item => "Entrega " + item.id),
        datasets:[{
            label:"Dias de atraso",
            data: ranking.map(item => item.real-item.prazo)
        }]
    },
    options:{
        indexAxis:"y"
    }
});
