import { db, collection, getDocs } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const collectionName = urlParams.get('collection'); // e.g., 'digitalPainting', 'pixelArt'

window.onload = async () => {
    if (!collectionName) {
        console.error('No collection parameter in the URL.');
        return;
    }

    // Set the path to the Firestore collection based on the URL parameter
    const imagesCollectionRef = collection(db, collectionName);

    try {
        const snapshot = await getDocs(imagesCollectionRef);
        const galleryContainer = document.getElementById("gallery");
        galleryContainer.innerHTML = ''; // Clear any existing content

        // Debugging: Check if we have data
        console.log(`Fetched ${snapshot.size} images from Firestore`);

        // Iterate over documents in the collection and add images
        snapshot.forEach(doc => {
            const imageData = doc.data(); // Access document data
            console.log(imageData); // Debugging: See the data for each image

            const imgElement = document.createElement("img");
            imgElement.src = imageData.imageURL; // Assuming your Firestore data has an 'imageURL' field
            imgElement.alt = imageData.description || "Image"; // Optional description (if you have this field)

            // Add the gallery-image class to apply the CSS styling
            imgElement.classList.add("gallery-image");

            // Add the image to the gallery
            galleryContainer.appendChild(imgElement);
        });
    } catch (error) {
        console.error("Error loading images from Firestore:", error);
    }
};
