// api.js
const BASE_URL = 'https://api.le-systeme-solaire.net/rest/bodies/';
const NASA_API_URL = 'https://images-api.nasa.gov/search';

// Function to fetch data for a celestial object based on its name
export async function fetchData(celestialObjectName) {
  const url = `${BASE_URL}${celestialObjectName}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API request failed.');
    }
    const data = await response.json();

    // Fetch Mars images and captions related to specific keywords from NASA images API
    if (celestialObjectName.toLowerCase() === 'mars') {
      const keywords = ['Mars surface', 'Mars rover', 'Martian landscape', 'Mars exploration', 'Red planet'];
      const keywordQuery = keywords.join(',');
      const nasaResponse = await fetch(`${NASA_API_URL}?q=${celestialObjectName}&media_type=image&page_size=4&keywords=${keywordQuery}`);
      const nasaData = await nasaResponse.json();

      // Add the fetched images and captions to the Mars data
      if (nasaData?.collection?.items && nasaData.collection.items.length > 0) {
        data.images = nasaData.collection.items.map(item => {
          return {
            image: item.links[0].href,
            caption: item.data[0].description
          };
        });
      }
    } else {
      // For other celestial objects, fetch random images and captions from NASA images API
      const randomPage = Math.floor(Math.random() * 10) + 1; // Generate a random page number between 1 and 10
      const nasaResponse = await fetch(`${NASA_API_URL}?q=${celestialObjectName}&media_type=image&page_size=4&page=${randomPage}`);
      const nasaData = await nasaResponse.json();

      // Add the fetched images and captions to the celestial object data
      if (nasaData?.collection?.items && nasaData.collection.items.length > 0) {
        data.images = nasaData.collection.items.map(item => {
          return {
            image: item.links[0].href,
            caption: item.data[0].description
          };
        });
      }
    }

    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}
