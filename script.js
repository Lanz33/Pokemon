async function renderPokedeck(j) {
    for (let i = 0; i < 15 + j; i++) {
        randomCards();
        let url = `https://pokeapi.co/api/v2/pokemon/` + randomNumber;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        renderCard(responseAsJson);
    }
}

function renderCard(responseAsJson) {
    let card = document.getElementById('cards');
    let rename = responseAsJson['name'].charAt(0).toUpperCase() + responseAsJson['name'].slice(1);
    pokeIndex = pokeIndex + 1;
    let pokemonData = {
        pokeIndex: pokeIndex,
        id: responseAsJson['id']
    };
    pokemonDataAsJSON.push(pokemonData);
    card.innerHTML += `
    <div id="poke${pokeIndex}" class="pokeCard" onclick="renderBig(${responseAsJson['id']}, ${pokeIndex})">
        <h2>${rename}</h2>
        <img class="pokeImage" src="${responseAsJson['sprites']['other']['official-artwork']['front_shiny']}">
    </div>`;
    setBackground(responseAsJson['types']['0']['type']['name'], pokeIndex);
}

async function renderBig(pokemonId, pokeIndex) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json();
    let rename = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1);
    document.getElementById('fullscreen').style.display = "flex";
    fullScreenHTML(rename, pokemonData, pokeIndex);
    setBackgroundBig(pokemonData['types']['0']['type']['name']);
    checkLeftRight(pokeIndex);
}

function cardBefore(pokeIndex) {
    let foundEntry = pokemonDataAsJSON.find(entry => entry.pokeIndex === pokeIndex-1);
    console.log(foundEntry);
    renderBig(foundEntry.id, pokeIndex-1);
}

function cardAfter(pokeIndex) {
    let foundEntry = pokemonDataAsJSON.find(entry => entry.pokeIndex === pokeIndex+1);
    console.log(foundEntry);
    renderBig(foundEntry.id, pokeIndex+1);
}

function checkLeftRight(cardID) {
    if (cardID == 1) {
        document.getElementById('left').style.display = "none";
    }
    else {
        document.getElementById('left').style.display = "block";
    }
    if (cardID == pokeIndex) {
        document.getElementById('right').style.display = "none";
    }
    else {
        document.getElementById('right').style.display = "block";
    }
}

async function renderDetails(pokemonId) {
    toggleDisplay();
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json();
    let table = document.createElement('tbody');
    table.innerHTML = `<tr><td></td></tr>`;
    table.innerHTML += `<tr><td>Height: </td><td>  ${pokemonData['height'] * 10} cm</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Weight: </td><td>  ${pokemonData['weight']} kg</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Base Exp.: </td><td>  ${pokemonData['base_experience']}</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Abilities: </td><td>  ${pokemonData['abilities']['0']['ability']['name']}</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Form: </td><td>  ${pokemonData['forms']['0']['name']}</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Element: </td><td>  ${pokemonData['types']['0']['type']['name']}</td><td> </td></tr>`;
    document.getElementById('details').innerHTML = '';
    document.getElementById('details').appendChild(table);
}

function toggleDisplay() {
    document.getElementById('statsArea').style.display = "none";
    document.getElementById('details').style.display = "block";
}

async function renderStats(pokemonId) {
    const pokemonData = await fetchPokemonData(pokemonId);
    const chartData = prepareChartData(pokemonData);
    const ctx = document.getElementById('statsArea').getContext('2d');
    renderChart(ctx, chartData);
    document.getElementById('details').style.display = "none";
    document.getElementById('statsArea').style.display = "block";
}

async function fetchPokemonData(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(url);
    return await response.json();
}

function prepareChartData(pokemonData) {
    const rowData = [];
    for (let i = 0; i < 6; i++) { rowData.push(pokemonData.stats[i].base_stat) }
    return {
        labels: ['HP', 'Attack', 'Defence', 'Special Attack', 'Special Defence', 'Speed'],
        datasets: [{
            data: rowData,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 1
        }]
    };
}

function renderChart(ctx, chartData) {
    const existingChart = Chart.getChart('statsArea');
    if (existingChart) { existingChart.destroy(); }
    const chartContainer = document.getElementById('statsArea').parentElement;
    chartContainer.style.position = 'relative';
    const yAxisLabels = chartContainer.querySelector('.chartjs-ylabel');
    if (yAxisLabels) { yAxisLabels.style.textShadow = '0px 0px 12px white'; }
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
}



function randomCards() {
    do {
        randomNumber = Math.floor(Math.random() * 1024);
    } while (generatedNumbers.includes(randomNumber));
    generatedNumbers.push(randomNumber);
    return randomNumber;
}

function displayOff() {
    document.getElementById('fullscreen').style.display = "none";
}

async function pokeQuery(event) {
    event.preventDefault(); // Standardverhalten des Formulars verhindern
    let searchPoke = document.getElementById("searchQuery").value;
    document.getElementById('cards').innerHTML = '';
    document.getElementById('searchQuery').innerHTML = ``;
    let url = `https://pokeapi.co/api/v2/pokemon/` + searchPoke;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    if (searchPoke == ``) {
        renderPokedeck();
    }
    if (response.status != 4) {
        pokeIndex = 0;
        renderCard(responseAsJson, 1);
    }
}

