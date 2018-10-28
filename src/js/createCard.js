
const formatFloat = value => {
    const pct = Math.round(value*1000)/10;
    return (pct === 100) ? pct.toFixed(0) : pct.toFixed(1);
}

const formatLabel = text => {

    let str = text.toLowerCase()
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()));
    
    return str.join(' ');
}

export const createCard = (image, classification, parent) => {

    const label = formatLabel(classification[0].className);
    const prob = formatFloat(classification[0].probability);

    const card = document.createElement("div");
    card.classList.add("card");

    const thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.classList.add("thumbnail-wrapper");

    image.classList.add("thumbnail");

    parent.appendChild(card);
    card.appendChild(thumbnailWrapper);
    thumbnailWrapper.appendChild(image);

    const panel_markup = `
    <div class="separator"></div>
    <div class="panel">
        <div class="classification">
            <h3 class="classification-label">${label}</h3>
            <h5 class="classification-title">MobileNet Classification</h5>
        </div>
        <div class="probability">
            <h2 class="probability-pct">${prob}%</h2>
            <h5 class="classification-title">Probability</h5>
        </div>
    </div>
    `;

    card.insertAdjacentHTML('beforeend', panel_markup);
}