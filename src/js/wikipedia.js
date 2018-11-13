const wiki = require('wikijs').default;
import isImageUrl from 'is-image-url';

const container = document.getElementById('container');

const isJPG = (file) => {
    return file.substring(file.length-3, file.length) === 'jpg';
}

export const findImages = async (key) => {
    try {
        const page = await wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' })
            .page(key);
        let images = await page.images();
        images = images.filter(isImageUrl);
        images = images.filter(isJPG);
        images = images.slice(0, 10);
        return images;
    } catch (error) {
        container.innerHTML = "";
        let markup;
        if (error.message === "Cannot read property 'redirects' of undefined") {
            markup = `<p id="error">Invalid search.</p>`;
        } else if (error.message === "No article found") {
            markup = `<p id="error">${error.message}.</p>`;
        } else {
            markup = `<p id="error">${error.message}.</p>`;
        }
        container.insertAdjacentHTML('afterbegin', markup);

        // console.error(error);
    }
}

//////////////////////////
// Get page
// wiki().page('Batman')
//     .then(console.log);

// Get field
// wiki().page('Batman')
//     .then(page => page.info('alterEgo'))
//     .then(console.log);

// Get images
// wiki().page('Batman')
//     .then(page => page.images())
//     .then(console.log);