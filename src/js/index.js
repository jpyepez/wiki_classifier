if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

// import ml5 from 'ml5'; // need to import for polyfill
import {loadImage} from './classifier';
import { findImages } from './wikipedia';
import '../styles/styles.css';
import astro from '../assets/astro.jpg';
import cube from '../assets/cube.jpg';
import fontawesome from '@fortawesome/fontawesome-free';
import faFreeSolid from '@fortawesome/fontawesome-free/js/solid';

const container = document.getElementById('container');
const imageUrl = document.getElementById('image-url');
const imageBtn = document.getElementById('classify-btn');
const label = document.querySelector('label');
const input = document.querySelector('input');
const searchBtn = document.getElementById('search-btn');
const thumb_ph =  document.getElementById('thumb-ph');
const thumb_ph2 =  document.getElementById('thumb-ph2');

// placeholder images
// thumb_ph.src = astro;
// thumb_ph2.src = cube;

input.addEventListener("focus", function() {
    label.classList.add("active");
})

input.addEventListener("blur", function() {
    if(input.value === "") {
        label.classList.remove("active");
    }
})

const submit = async (term) => {
    const wikiImgUrls = await findImages(term);

    container.innerHTML = "";
    wikiImgUrls.forEach(url => loadImage(url, container));
}

imageUrl.addEventListener("keypress", function(e) {
    const key = e.which || e.keyCode;
    if(key === 13) {
        submit(imageUrl.value);
    }
})

searchBtn.addEventListener("click", function() {
    submit(imageUrl.value);
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
