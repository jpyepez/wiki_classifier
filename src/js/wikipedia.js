const wiki = require('wikijs').default;
import isImageUrl from 'is-image-url';

const isJPG = (file) => {
    return file.substring(file.length-3, file.length) === 'jpg';
}

export const findImages = async (key) => {
    try {
        const page = await wiki().page(key);
        let images = await page.images();
        images = images.filter(isImageUrl);
        images = images.filter(isJPG);
        return images;
    } catch (error) {
        console.error(error);
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