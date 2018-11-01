const markup = `
    <svg id="loading">

        <rect x="0" y="50" width="20" height="100" fill="#34CB6E">
            <animate attributeName="y" values="50;0;50" begin="0s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="height" values="0;100;0" begin="0s" dur="1s" repeatCount="indefinite" />
        </rect>

        <rect x="40" y="50" width="20" height="0" fill="#34CB6E">
            <animate attributeName="y" values="50;0;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="height" values="0;100;0" begin="0.2s" dur="1s" repeatCount="indefinite" />
        </rect>

        <rect x="80" y="50" width="20" height="0" fill="#34CB6E">
            <animate attributeName="y" values="50;0;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="height" values="0;100;0" begin="0.4s" dur="1s" repeatCount="indefinite" />
        </rect>

    </svg>
`
export default (parent) => {
    parent.insertAdjacentHTML('beforeend', markup);
}