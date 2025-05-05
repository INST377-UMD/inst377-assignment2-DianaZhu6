
const apiKey = 'zSNWR6z7nSLQuH6D0iXA6KTdkoubjFka'; 
const stockForm = document.getElementById('stock-form');
const stockInput = document.getElementById('stock-input');
const dateRangeSelect = document.getElementById('date-range');
const chartCanvas = document.getElementById('stock-chart').getContext('2d');
const redditTable = document.getElementById('reddit-table');

let stockChart;

stockForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticker = stockInput.value.toUpperCase();
  const range = parseInt(dateRangeSelect.value);
  if (ticker && range) {
    fetchStockData(ticker, range);
  }
});

async function fetchStockData(ticker, range) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - range);
  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results || [];

    const labels = results.map(d => new Date(d.t).toLocaleDateString());
    const values = results.map(d => d.c);

    renderChart(ticker, labels, values);
}
//make chart 
function renderChart(ticker, labels, values) {
  if (stockChart){
    stockChart.destroy();
  }
  stockChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${ticker} Closing Prices`,
        data: values,
        borderColor: 'rgb(230, 130, 168)',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { display: true }
      }
    }
  });
}
//top 5 list
async function loadRedditTop5() {
    const response = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
    const data = await response.json();
    const top5 = data.slice(0, 5);
  
    redditTable.innerHTML = '<tr><th>Ticker</th><th>Comments</th><th>Sentiment</th></tr>';
    top5.forEach(stock => {
      const iconUrl = stock.sentiment.toLowerCase() === 'bullish'
        ? 'https://cdn-icons-png.flaticon.com/512/6978/6978349.png'
        : 'https://cdn-icons-png.flaticon.com/512/4964/4964784.png';
  
      redditTable.innerHTML += `
        <tr>
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>
            ${stock.sentiment}
            <img src="${iconUrl}"   style="width: 24px; height: 24px; vertical-align: middle;">
          </td>
        </tr>`;
    });
  }


  document.addEventListener('DOMContentLoaded', loadRedditTop5);










// Annyang voice commands

function startVoice() {
    if (annyang) {
      annyang.start();
    }
  }
  
  function stopVoice() {
    if (annyang) {
      annyang.abort();
    }
  }
  
  if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        const lowerPage = page.toLowerCase();
        if (lowerPage.includes('home')) location.href = 'index.html';
        else if (lowerPage.includes('stock')) location.href = 'stocks.html';
        else if (lowerPage.includes('dog')) location.href = 'dogs.html';
      }
    };
  
    annyang.addCommands(commands);
  }



