//Quote
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://zenquotes.io/api/random")
    .then((response) => response.json())
    .then((data) => {
      const quote = data[0];
      const quoteElement = document.getElementById("quote");
      if (quoteElement) {
        quoteElement.textContent = `"${quote.q}" — ${quote.a}`;
      }
    })
});
  



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



