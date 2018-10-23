if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import ml5 from 'ml5'; // need to import for polyfill
import isImageUrl from 'is-image-url';
import { findImages } from './wikipedia';
import { createCard } from './createCard';
import '../styles/styles.css';
import astro from '../assets/astro.jpg';

const container = document.getElementById('container');
const imageUrl = document.getElementById('image-url');
const imageBtn = document.getElementById('classify-btn');
const label = document.querySelector('label');
const input = document.querySelector('input');
const thumb_ph =  document.getElementById('thumb-ph');

thumb_ph.src = astro;

input.addEventListener("focus", function() {
    label.classList.add("active");
    console.log(label.classList);
})

input.addEventListener("blur", function() {
    if(input.value === "") {
        label.classList.remove("active");
        console.log(label.classList);
    }
})


// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', function() {
    console.log('Model Loaded!');
  });

const loadImage = async (url) => {

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
                    createCard(this, results, container)
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

const submit = async (term) => {
    const wikiImgUrls = await findImages(term);
    wikiImgUrls.forEach(loadImage);
}

imageUrl.addEventListener("keypress", function(e) {
    const key = e.which || e.keyCode;
    if(key === 13) {
        submit(imageUrl.value);
    }
})

// const paragraph = document.createElement('p');
// paragraph.textContent = `MobileNet has labeled this as a ${className}, with a probability of ${probability}.`;
// 
// parent.appendChild(inputImg);
// parent.appendChild(paragraph)


// maybe use magnifying glass as button
// imageBtn.addEventListener("click", async function() {
//     submit(imageUrl.value);
// });

// Test urls
const penguinUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg/1200px-South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg"
const catUrl = "https://ml5js.org/docs/assets/img/kitten.jpg" ;
const ponyUrl = "https://cdn0.wideopenpets.com/wp-content/uploads/2015/12/pony-981528_1920-770x405.jpg";
