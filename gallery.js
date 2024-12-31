import { db, collection, getDocs, query, orderBy } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const collectionName = urlParams.get('collection'); // e.g., 'digitalPainting', 'pixelArt'

window.onload = async () => {
    const galleryContainer = document.getElementById("gallery"); // Ensure it's initialized
    galleryContainer.innerHTML = ''; // Clear any existing content

    if (!collectionName) {
        // If no specific collection is provided, load all galleries
        await loadAllGalleries(galleryContainer);
        return;
    }

    // Load images from a specific collection
    const imagesCollectionRef = collection(db, collectionName);

    try {
        const imagesQuery = query(imagesCollectionRef, orderBy("timestamp", "desc")); // Sort by timestamp descending (newest first)
        const snapshot = await getDocs(imagesQuery);

        console.log(`Fetched ${snapshot.size} images from Firestore`);

        snapshot.forEach(doc => {
            const imageData = doc.data();

            // Create an <a> element to wrap the <img>
            const anchorElement = document.createElement("a");
            anchorElement.href = imageData.imageURL; // URL of the full-size image
            anchorElement.target = "_blank"; // Open in a new tab

            const imgElement = document.createElement("img");
            imgElement.src = imageData.imageURL; 
            imgElement.alt = imageData.description || "Image"; 

            imgElement.classList.add("gallery-image");

            // Append the image to the anchor
            anchorElement.appendChild(imgElement);

            // Add the anchor (with the image) to the gallery
            galleryContainer.appendChild(anchorElement);
        });
    } catch (error) {
        console.error("Error loading images from Firestore:", error);
    }
};

async function loadAllGalleries(container) {
    const galleriesCollectionRef = collection(db, 'galleries');

    try {
        const snapshot = await getDocs(galleriesCollectionRef);
    
        console.log(`Fetched ${snapshot.size} galleries from Firestore`);
    
        snapshot.forEach((doc) => {
            const galleryData = doc.data();
    
            // Create the anchor element for the gallery
            const anchorElement = document.createElement("a");
            anchorElement.href = `gallery.html?collection=${doc.id}`; // Link to the gallery using its ID
            anchorElement.classList.add("gallery-link");
    
            // Create the title element
            const titleElement = document.createElement("h1");
            titleElement.textContent = galleryData.name;
            titleElement.classList.add("gallery-title");
    
            // Create the image element
            const imgElement = document.createElement("img");
            imgElement.src = galleryData.thumburl;
            imgElement.alt = galleryData.name || "Gallery";
            imgElement.classList.add("gallery-thumbnail");
    
            // Append the title and image in the correct order
            anchorElement.appendChild(titleElement);
            anchorElement.appendChild(imgElement);
    
            // Create a gallery item and append the anchor
            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");
            galleryItem.appendChild(anchorElement);
    
            // Append the gallery item to the container
            container.appendChild(galleryItem);
        });
    } catch (error) {
        console.error("Error loading galleries from Firestore:", error);
    };
};