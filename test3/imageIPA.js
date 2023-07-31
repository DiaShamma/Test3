// imageIPA.js
export async function fetchImageData(nasaId) {
  const assetUrl = `https://images-api.nasa.gov/asset/${encodeURIComponent(nasaId)}`;
  const metadataUrl = `https://images-api.nasa.gov/metadata/${encodeURIComponent(nasaId)}`;
  const captionsUrl = `https://images-api.nasa.gov/captions/${encodeURIComponent(nasaId)}`;

  try {
    const [assetResponse, metadataResponse, captionsResponse] = await Promise.all([
      fetch(assetUrl).then((response) => response.json()),
      fetch(metadataUrl).then((response) => response.json()),
      fetch(captionsUrl).then((response) => response.json()),
    ]);

    return {
      assetData: assetResponse,
      metadataData: metadataResponse,
      captionsData: captionsResponse,
    };
  } catch (error) {
    throw new Error('Error fetching image data:', error);
  }
}
