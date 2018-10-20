if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

//import classifier from './classifier';
import { classifyImageUrl } from './classifier';
import { findImages } from './wikipedia';

console.log("started");

const container = document.getElementById('container');
const imageUrl = document.getElementById('image-url');
const imageBtn = document.getElementById('classify-btn');

const submit = async (term) => {
    const images = await findImages(term);
    images.forEach(image => classifyImageUrl(image, container));
}

imageUrl.addEventListener("keypress", function(e) {
    const key = e.which || e.keyCode;
    if(key === 13) {
        submit(imageUrl.value);
    }
})

// maybe use magnifying glass as button
// imageBtn.addEventListener("click", async function() {
//     submit(imageUrl.value);
// });

// Test urls
const penguinUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg/1200px-South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg"
const catUrl = "https://ml5js.org/docs/assets/img/kitten.jpg" ;
const ponyUrl = "https://cdn0.wideopenpets.com/wp-content/uploads/2015/12/pony-981528_1920-770x405.jpg";

// classifier.classifyImageUrl(penguinUrl, container);
// classifier.classifyImageUrl(catUrl, container);
// classifier.classifyImageUrl(ponyUrl, container);
