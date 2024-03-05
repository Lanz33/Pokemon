let randomNumber;
let generatedNumbers = [];
let pokeIndex = 0;
let pokemonDataAsJSON = [];

let chartOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
        legend: {
            labels: {
                font: { size: 0 }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                color: 'black',
                family: 'Roboto'
            }
        },
        x: { display: false }
    }
};

function fullScreenHTML(rename, pokemonData, pokeIndex){
    document.getElementById('fullscreen').innerHTML = `
    <div id="left" onclick="cardBefore(${pokeIndex})">&#171;</div>
    <div class="cardCenter" id="PokemonBig">
        <h2>${rename}</h2>
        <img class="pokeImage scale1-3" src="${pokemonData['sprites']['other']['official-artwork']['front_shiny']}">
        <div class="headLine" id="headlineBig" onclick="event.stopPropagation()">
            <div onclick="renderDetails(${pokemonData['id']})">Details</div>
            <div onclick="renderStats(${pokemonData['id']})">Stats</div>
        </div>
        <div id="details"></div>
        <canvas class="stats" id="statsArea"></canvas> 
    </div>
    <div id="right" onclick="cardAfter(${pokeIndex})">&#187;</div>
    `;
}
