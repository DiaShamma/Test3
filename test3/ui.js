// // ui.js
// export function renderCelestialObject(data) {
//   const container = document.querySelector('.container');
//   container.innerHTML = '';
//   if (!data) {
//     container.innerHTML = '<p>Error fetching data.</p>';
//     return;
//   }

//   const celestialObjectContent = document.createElement('div');
//   celestialObjectContent.classList.add('celestial-object-content');

//   // Create container for object information
//   const objectInfoContainer = document.createElement('div');
//   objectInfoContainer.classList.add('object-info-container');

//   // Create container for images and captions
//   const imagesContainer = document.createElement('div');
//   imagesContainer.classList.add('images-container');

//   // Add object information to the objectInfoContainer
//   for (const key in data) {
//     if (key === 'moons') {
//       objectInfoContainer.innerHTML += `<p><strong>${key}:</strong> ${formatMoons(data[key])}</p>`;
//     } else {
//       objectInfoContainer.innerHTML += `<p><strong>${key}:</strong> ${JSON.stringify(data[key])}</p>`;
//     }
//   }

//   // Add images and captions to the imagesContainer
//   data.images.forEach((imageData, index) => {
//     imagesContainer.innerHTML += `
//       <div class="image-card">
//         <div class="image-container">
//           <img src="${imageData.image}" alt="${data.title} Image ${index + 1}">
//         </div>
//         <div class="caption">
//           <p><strong>Caption ${index + 1}:</strong> ${imageData.caption}</p>
//         </div>
//       </div>
//     `;
//   });

//   // Append the containers to the celestialObjectContent
//   celestialObjectContent.appendChild(objectInfoContainer);
//   celestialObjectContent.appendChild(imagesContainer);

//   container.appendChild(celestialObjectContent);
// }

// function formatMoons(moons) {
//   if (!moons || moons.length === 0) {
//     return 'No moons';
//   }
//   return moons.map(moon => moon.moon).join(', ');
// }



// ui.js
// ui.js
export function renderCelestialObject(data) {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  if (!data) {
    container.innerHTML = '<p>Error fetching data.</p>';
    return;
  }

  const celestialObjectContent = document.createElement('div');
  celestialObjectContent.classList.add('celestial-object-content');

  // Create container for object information
  const objectInfoContainer = document.createElement('div');
  objectInfoContainer.classList.add('object-info-container');

  // Create container for images
  const imagesContainer = document.createElement('div');
  imagesContainer.classList.add('images-container');

  // Add object information to the objectInfoContainer
  for (const key in data) {
    if (key === 'moons') {
      objectInfoContainer.innerHTML += `<p><strong>${key}:</strong> ${formatMoons(data[key])}</p>`;
    } else {
      objectInfoContainer.innerHTML += `<p><strong>${key}:</strong> ${JSON.stringify(data[key])}</p>`;
    }
  }

  // Add images to the imagesContainer
  data.images.forEach((imageData, index) => {
    imagesContainer.innerHTML += `
      <div class="image-card">
        <div class="image-container">
          <img src="${imageData.image}" alt="${data.title} Image ${index + 1}">
        </div>
      </div>
    `;
  });

  // Append the containers to the celestialObjectContent
  celestialObjectContent.appendChild(objectInfoContainer);
  celestialObjectContent.appendChild(imagesContainer);

  container.appendChild(celestialObjectContent);
}

function formatMoons(moons) {
  if (!moons || moons.length === 0) {
    return 'No moons';
  }
  return moons.map(moon => moon.moon).join(', ');
}
