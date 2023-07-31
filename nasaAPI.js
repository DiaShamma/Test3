
// nasaAPI.js

const NASA_API_KEY = 'dKrAB8OEc1KgJ7iITtMczpn97KEz4jJyijuH0Ygb'; // Replace with your NASA API key
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchRandomSpacePicture() {
  const date = getRandomDate();
  const url = `${NASA_API_URL}?api_key=${NASA_API_KEY}&date=${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching random space picture:', error);
  }
}

function getRandomDate() {
  // Generate a random date within the last 30 days
  const today = new Date();
  const startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const randomTimestamp = startDate.getTime() + Math.random() * (today.getTime() - startDate.getTime());
  const randomDate = new Date(randomTimestamp);
  const year = randomDate.getFullYear();
  let month = randomDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = randomDate.getDate();
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
}


