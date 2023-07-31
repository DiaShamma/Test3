// Welcome.js
import { fetchRandomSpacePicture } from './nasaAPI.js';

export class WelcomePage {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.pictureInterval = null; // Initialize the interval variable to null
  }

  async renderWelcomePage() {
    const welcomePageContent = document.createElement('div');
    welcomePageContent.classList.add('welcome-content');

    const nasaPicture = await fetchRandomSpacePicture();

    welcomePageContent.innerHTML = `
      <h1>Starry App</h1>
      <div class="welcomCards">
      <div class="ParaCard">
      <p id="welcomHeader">Welcome to the Starry App!</p>
          <p>* Explore the wonders of the universe by scrolling through celestial objects.</p>
          <p>* Use your mouse or touchpad to scroll up and down, and you'll journey through the solar system.</p>
          <p>* As you scroll, you'll discover fascinating facts and images about each celestial object.</p>
          <p>* To go back to the first object in the solar system, simply scroll in the opposite direction.</p>
          <p>* When you reach Neptune, keep scrolling to enter the search page and discover more space-related images.</p>
          <p>* Get ready for an exciting cosmic adventure!</p>
          <p>* Enjoy exploring the cosmos with Starry App!</p>
      </div>
      <div class="imagCard">

      <img src="${nasaPicture?.url}" alt="Random Space Picture">
      </div>

      </div>
    `;

    this.container.appendChild(welcomePageContent);
  }

  async updateWelcomePagePicture() {
    const nasaPicture = await fetchRandomSpacePicture();
    const welcomeImg = this.container.querySelector('img');
    if (nasaPicture?.url) {
      welcomeImg.src = nasaPicture.url;
    }
  }

  startUpdatingPicture(intervalTime = 1000) {
    // Set an interval to update the welcome page picture every 'intervalTime' milliseconds
    this.pictureInterval = setInterval(() => this.updateWelcomePagePicture(), intervalTime);
  }

  stopUpdatingPicture() {
    // Clear the interval to stop updating the welcome page picture
    clearInterval(this.pictureInterval);
  }

  removeWelcomePageContent() {
    const welcomeContent = this.container.querySelector('.welcome-content');
    if (welcomeContent) {
      welcomeContent.remove();
    }
  }
}
