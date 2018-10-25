
const formatFloat = (value) => {
    return Math.round(value*100).toFixed(1);
}

export const createCard = (image, classification, parent) => {

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
            <h3 class="classification-label">${classification[0].className}</h3>
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