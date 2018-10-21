
export const createCard = (image, classification, parent) => {
    const markup = `
    <div>
        <p>${classification[0].className}</p>
        <p>${classification[0].probability}</p>
    </div>
    `;

    const imgWrapper = document.createElement("div");

    parent.appendChild(imgWrapper);
    imgWrapper.appendChild(image);
    parent.insertAdjacentHTML('beforeend', markup);
}