export async function searchNASA(mediaType = "image") {
  const searchTerm = document.getElementById("searchInput").value;
  if (searchTerm.trim() === "") {
    alert("Please enter a valid search keyword.");
    return Promise.resolve([]);
  }

  const searchUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
    searchTerm
  )}&media_type=${mediaType}`;

  return fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.collection &&
        data.collection.items &&
        data.collection.items.length > 0
      ) {
        return data.collection.items;
      } else {
        alert("No results found.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data from NASA Images API.");
      return [];
    });
}

export function displaySearchResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous search results

  if (!items || items.length === 0) {
    // If the items array is empty, display a message
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  items.forEach((item) => {
    const mediaType = item?.data?.[0]?.media_type;
    const title = item?.data?.[0]?.title;
    const description =
      item?.data?.[0]?.description || "No description available";

    if (mediaType === "image") {
      const imageSrc = item?.links?.[0]?.href;
      if (imageSrc) {
        resultsDiv.innerHTML += `<img src="${imageSrc}" alt="${title}" style="max-width: 300px;">
                                   <p><strong>Title:</strong> ${title}</p>
                                   <p><strong>Description:</strong> ${description}</p>
                                   <hr>`;
      }
    } else if (mediaType === "audio") {
      const audioSrc = item?.links?.[0]?.href;
      if (audioSrc) {
        resultsDiv.innerHTML += `<audio controls>
                                   <source src="${audioSrc}" type="audio/mpeg">
                                 </audio>
                                 <p><strong>Title:</strong> ${title}</p>
                                 <p><strong>Description:</strong> ${description}</p>
                                 <hr>`;
      }
    } else if (mediaType === "video") {
      const videoSrc = item?.links?.[0]?.href;
      if (videoSrc) {
        resultsDiv.innerHTML += `<video controls>
                                   <source src="${videoSrc}" type="video/mpeg">
                                 </video>
                                 <p><strong>Title:</strong> ${title}</p>
                                 <p><strong>Description:</strong> ${description}</p>
                                 <hr>`;
      }
    } else {
      // Handle other types of assets (if needed)
    }
  });
}
