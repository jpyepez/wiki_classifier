
// TODO: Integrate with wikipedia API
// TODO: Format output (CSS)

import ml5 from 'ml5';
import isImageUrl from 'is-image-url';

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', function() {
    console.log('Model Loaded!');
  });

const predict = (inputImg, parent) => {

        classifier.predict(inputImg, (err, results) => {
            if (err) {
                console.error(err);
            } else {
                const className = results[0].className;
                const probability = results[0].probability.toFixed(4);
                
                const paragraph = document.createElement('p');
                paragraph.textContent = `MobileNet has labeled this as a ${className}, with a probability of ${probability}.`;
                
                parent.appendChild(inputImg);
                parent.appendChild(paragraph)
                // console.log(results);
            }
        });
}

// get random image, classify, and append image to parent
// does not work for all links
export const classifyImageUrl = (imageUrl, parent) => {

    if (isImageUrl(imageUrl)) {

        // create Image
        // Requires image size
        const newImg = new Image();
        newImg.crossOrigin = "anonymous";
        newImg.src = imageUrl;

        newImg.addEventListener("load", function () {
            this.width = this.naturalWidth;
            this.height = this.naturalHeight;

            predict(newImg, parent);
        });
    } else {
        console.log("URL is not an image.")
    }
}