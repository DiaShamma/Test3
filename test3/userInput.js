// userInput.js

import { fetchData } from './api.js';
import { renderCelestialObject } from './ui.js';

// userInput.js

let currentPageIndex = 0;
const celestialObjects = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

export async function handleUserInput(event) {
  const direction = event.deltaY > 0 ? 'out' : 'in';

  if (direction === 'out') {
    currentPageIndex = (currentPageIndex + 1) % celestialObjects.length;
  } else {
    currentPageIndex = (currentPageIndex - 1 + celestialObjects.length) % celestialObjects.length;
  }

  const celestialObjectName = celestialObjects[currentPageIndex];

  try {
    const data = await fetchData(celestialObjectName);
    renderCelestialObject(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export { currentPageIndex }; // Export the currentPageIndex variable

