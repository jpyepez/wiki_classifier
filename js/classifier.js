const axios = require('axios');

const rndDogUrl = "https://dog.ceo/api/breeds/image/random";

// TODO: Fix test cat with ES6 stuff
// TODO: Try dog function


// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', function() {
    console.log('Model Loaded!');
  });

// get random dog, classify, and append image to parent
module.exports.classifyRndDog = async (parent) => {
    try {
        const query = await axios.get(rndDogUrl);

        // create Image
        // Requires image size
        const newDog = new Image();
        newDog.src = await query.data.message;


        const paragraph = document.createElement('p');
        paragraph.textContent = `MobileNet has labeled this as a ..., with a probability of ....`;

        parent.appendChild(newDog);
        parent.appendChild(paragraph)
        // console.log(results);

    } catch (error) {
        console.error(error);
    }
}

// get and classify test tabby cat
module.exports.classifyTestCat = (parent) => {

    // Test cat image
    // Requires anonymous cross origin and image size
    const testCat = new Image();
    testCat.crossOrigin = "anonymous";
    testCat.src = 'https://ml5js.org/docs/assets/img/kitten.jpg';

    testCat.addEventListener("load", function () {
        testCat.width = this.naturalWidth;
        testCat.height = this.naturalHeight;

        classifier.predict(testCat, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                const className = results[0].className;
                const probability = results[0].probability.toFixed(4);
                
                const paragraph = document.createElement('p');
                paragraph.textContent = `MobileNet has labeled this as a ${className}, with a probability of ${probability}.`;

                parent.appendChild(testCat);
                parent.appendChild(paragraph)
                // console.log(results);
            }
        });
    });
}