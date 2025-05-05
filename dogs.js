const carouselContainer = document.getElementById('dog-carousel');
const breedButtonsContainer = document.getElementById('breed-buttons');
const breedInfoSection = document.getElementById('breed-info');
const breedName = document.getElementById('breed-name');
const breedDescription = document.getElementById('breed-description');
const minLife = document.getElementById('min-life');
const maxLife = document.getElementById('max-life');

document.addEventListener('DOMContentLoaded', () => {
  loadDogCarousel();
  loadBreedButtons();
  startVoice();
});

async function loadDogCarousel() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await res.json();
    const images = data.message;

    //load images
    images.forEach(imgUrl => {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      carouselContainer.appendChild(img);
    });

    // setup carousel
    carouselContainer.style.width = '700px';
    carouselContainer.style.height = '500px';
    carouselContainer.setAttribute('data-simple-slider', '');

    // slider:
    simpleslider.getSlider({
      container: carouselContainer,
      transitionTime: 0.5,
      delay: 3,
      pause: false
    });
  }

///////////////////////////////////////
// dog buttons:
async function loadBreedButtons() {
    const res = await fetch('https://dogapi.dog/api/v2/breeds');
    const json = await res.json();
    const breeds = json.data;
    console.log(breeds);
  //set up buttons
    breeds.forEach(entry => {
      const breed = entry.attributes;
      const btn = document.createElement('button');
      btn.textContent = breed.name;
      btn.setAttribute('class', 'button-13');
      btn.addEventListener('click', () => showBreedInfo(breed));
      breedButtonsContainer.appendChild(btn);
    });
}
//display breed info 
function showBreedInfo(breed) {
  breedName.textContent = breed.name;
  breedDescription.textContent = breed.description;
  minLife.textContent = breed.life.min;
  maxLife.textContent = breed.life.max;
  breedInfoSection.style.display = 'block';
}

// Annyang voice command: DOG 

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
    },
    'load dog breed *name': async (name) => {
        const res = await fetch('https://dogapi.dog/api/v2/breeds');
        const json = await res.json();
        const breedData = json.data.find(entry => entry.attributes.name.toLowerCase() === name.toLowerCase());
        if (breedData) {
          showBreedInfo(breedData.attributes);
        }
      }
  };

  annyang.addCommands(commands);
}
