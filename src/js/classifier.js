import ml5 from 'ml5';
import isImageUrl from 'is-image-url';
import { createCard } from './createCard';

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', function() {
    console.log('Model Loaded!');
  });

export const loadImage = async (url, parent) => {

    if (isImageUrl(url)) {

        // load image
        // use handler to classify when loaded
        const downloadingImage = new Image();
        downloadingImage.crossOrigin = "anonymous";
        downloadingImage.onload = function() {
            classifier.predict(this, (err, results) => {
                if (err) {
                    console.error(err);
                } else {
                    createCard(this, results, parent)
                    // console.log(results);
                }
            })
        }
        downloadingImage.src = url;

        return downloadingImage;

    } else {
        console.log("URL is not an image.")
    }
}