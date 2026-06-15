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

let chartTransportadoras;
let chartRegioes;
let chartRanking;

const filtroRegiao = document.getElementById("filtroRegiao");
const filtroTransportadora = document.getElementById("filtroTransportadora");

popularFiltros();
atualizarDashboard();

filtroRegiao.addEventListener("change", atualizarDashboard);
filtroTransportadora.addEventListener("change", atualizarDashboard);

function popularFiltros(){

const regioes = [...new Set(dados.map(d => d.regiao))];
const transportadoras = [...new Set(dados.map(d => d.transportadora))];

regioes.forEach(r=>{
filtroRegiao.innerHTML += `<option value="${r}">${r}</option>`;
});

transportadoras.forEach(t=>{
filtroTransportadora.innerHTML += `<option value="${t}">${t}</option>`;
});

}

function atualizarDashboard(){

const regiaoSelecionada = filtroRegiao.value;
const transportadoraSelecionada = filtroTransportadora.value;

const filtrado = dados.filter(item => {

const filtro1 =
regiaoSelecionada === "Todos" ||
item.regiao === regiaoSelecionada;

const filtro2 =
transportadoraSelecionada === "Todos" ||
item.transportadora === transportadoraSelecionada;

return filtro1 && filtro2;

});

const atrasadas = filtrado.filter(
d => d.real > d.prazo
);

const percentual =
filtrado.length > 0
? ((atrasadas.length / filtrado.length) * 100).toFixed(1)
: 0;

const maiorAtraso =
atrasadas.length > 0
? Math.max(...atrasadas.map(d => d.real - d.prazo))
: 0;

document.getElementById("totalEntregas").textContent =
filtrado.length;

document.getElementById("entregasAtrasadas").textContent =
atrasadas.length;

document.getElementById("percentualAtraso").textContent =
percentual + "%";

document.getElementById("maiorAtraso").textContent =
maiorAtraso + " dias";

const status = document.getElementById("statusOperacional");

if(percentual >= 60){
status.innerHTML = "🔴 Situação Crítica";
}
else if(percentual >= 30){
status.innerHTML = "🟡 Atenção Operacional";
}
else{
status.innerHTML = "🟢 Operação Controlada";
}

montarTabela(filtrado);
gerarGraficoTransportadoras(atrasadas);
gerarGraficoRegioes(atrasadas);
gerarRanking(atrasadas);

}

function montarTabela(lista){

const tabela =
document.getElementById("tabelaEntregas");

tabela.innerHTML = "";

lista.forEach(item=>{

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
<td>${atraso > 0 ? "+"+atraso : atraso}</td>
</tr>
`;

});

}

function gerarGraficoTransportadoras(atrasadas){

const contador = {};

atrasadas.forEach(item=>{
contador[item.transportadora] =
(contador[item.transportadora] || 0) + 1;
});

if(chartTransportadoras){
chartTransportadoras.destroy();
}

chartTransportadoras = new Chart(
document.getElementById("graficoTransportadoras"),
{
type:"bar",
data:{
labels:Object.keys(contador),
datasets:[{
label:"Entregas Atrasadas",
data:Object.values(contador)
}]
},
options:{
responsive:true
}
}
);

}

function gerarGraficoRegioes(atrasadas){

const contador = {};

atrasadas.forEach(item=>{
contador[item.regiao] =
(contador[item.regiao] || 0) + 1;
});

if(chartRegioes){
chartRegioes.destroy();
}

chartRegioes = new Chart(
document.getElementById("graficoRegioes"),
{
type:"doughnut",
data:{
labels:Object.keys(contador),
datasets:[{
data:Object.values(contador)
}]
}
}
);

}

function gerarRanking(atrasadas){

const ranking = [...atrasadas]
.sort((a,b)=>
(b.real-b.prazo) -
(a.real-a.prazo)
);

if(chartRanking){
chartRanking.destroy();
}

chartRanking = new Chart(
document.getElementById("graficoRanking"),
{
type:"bar",
data:{
labels: ranking.map(
i => "Entrega " + i.id
),
datasets:[{
label:"Dias de Atraso",
data: ranking.map(
i => i.real - i.prazo
)
}]
},
options:{
indexAxis:'y'
}
}
);

}
