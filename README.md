# Dashboard Inteligente de Monitoramento Logístico

## Objetivo

Desenvolver uma solução visual para monitoramento de atrasos logísticos, permitindo que gestores identifiquem rapidamente gargalos operacionais, regiões críticas e transportadoras com baixo desempenho.

---

## Problema

A empresa depende de planilhas extensas e relatórios manuais para acompanhar suas entregas, dificultando:

- Identificação de transportadoras com maior índice de atraso;
- Visualização de regiões críticas;
- Priorização das entregas mais problemáticas;
- Acompanhamento de tendências operacionais;
- Tomada de decisão em tempo real.

---

## Regra de Negócio

Uma entrega é considerada atrasada quando:

dias_reais > prazo_dias

O atraso é calculado por:

atraso = dias_reais - prazo_dias

---

## Funcionalidades do Dashboard

### Indicadores (KPIs)

- Total de entregas
- Quantidade de entregas atrasadas
- Percentual de atraso
- Maior atraso registrado

### Recursos Analíticos

- Filtro por região
- Filtro por transportadora
- Gráfico de atrasos por transportadora
- Gráfico de distribuição por região
- Ranking das entregas mais críticas
- Tabela dinâmica
- Alertas automáticos
- Priorização visual por cores

### Classificação Visual

🟢 Normal → sem atraso

🟡 Atenção → atraso de até 5 dias

🔴 Crítico → atraso superior a 5 dias

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Chart.js
- GitHub Pages

---

## Processo de Construção

1. Organização dos dados fornecidos.
2. Aplicação da regra de negócio para cálculo dos atrasos.
3. Construção dos indicadores principais.
4. Desenvolvimento dos gráficos de apoio à decisão.
5. Criação de filtros para análise interativa.
6. Implementação de alertas visuais.
7. Publicação via GitHub Pages.

---

## Resultados Obtidos

O dashboard permite:

- Identificar rapidamente transportadoras problemáticas;
- Detectar regiões com maior incidência de atraso;
- Priorizar entregas críticas;
- Apoiar decisões operacionais;
- Melhorar a visibilidade dos indicadores logísticos.

---

## Link do Dashboard

Inserir aqui o link do GitHub Pages após a publicação.

Exemplo:

https://seuusuario.github.io/dashboard-logistica/
