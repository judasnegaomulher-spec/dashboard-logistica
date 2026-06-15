const dados = [
{id:1, transportadora:"TransLog", regiao:"Sudeste", atraso:5},
{id:2, transportadora:"Rápido Brasil", regiao:"Sul", atraso:0},
{id:3, transportadora:"TransLog", regiao:"Nordeste", atraso:8},
{id:4, transportadora:"EntregaMax", regiao:"Sudeste", atraso:2},
{id:5, transportadora:"EntregaMax", regiao:"Norte", atraso:10},
{id:6, transportadora:"Rápido Brasil", regiao:"Centro-Oeste", atraso:0}
];

const total = dados.length;
const atrasadas = dados.filter(e => e.atraso > 0);

document.getElementById("total").textContent = total;
document.getElementById("atrasadas").textContent = atrasadas.length;
document.getElementById("percentual").textContent =
((atrasadas.length/total)*100).toFixed(1) + "%";

const transportadoras = {};

atrasadas.forEach(item=>{
transportadoras[item.transportadora] =
(transportadoras[item.transportadora] || 0)+1;
});

new Chart(
document.getElementById('transportadoraChart'),
{
type:'bar',
data:{
labels:Object.keys(transportadoras),
datasets:[{
label:'Atrasos',
data:Object.values(transportadoras)
}]
}
}
);

const regioes = {};

atrasadas.forEach(item=>{
regioes[item.regiao] =
(regioes[item.regiao] || 0)+1;
});

new Chart(
document.getElementById('regiaoChart'),
{
type:'pie',
data:{
labels:Object.keys(regioes),
datasets:[{
data:Object.values(regioes)
}]
}
}
);

atrasadas
.sort((a,b)=>b.atraso-a.atraso)
.forEach(item=>{

document.getElementById("rankingBody").innerHTML += `
<tr>
<td>${item.id}</td>
<td>${item.transportadora}</td>
<td>${item.regiao}</td>
<td>${item.atraso}</td>
</tr>
`;

});
