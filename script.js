let randomNumber;
let generatedNumbers = [];

async function renderPokedeck() {
    for (let i = 0; i < 20; i++) {
        randomCards();
        let url = `https://pokeapi.co/api/v2/pokemon/` + randomNumber;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        renderCard(responseAsJson, i);
    }
}

function renderCard(responseAsJson, i) {
    let card = document.getElementById('cards');
    let rename = responseAsJson['name'].charAt(0).toUpperCase() + responseAsJson['name'].slice(1);
    card.innerHTML += `
    <div id="poke${i}" class="pokeCard" onclick="renderBig(${responseAsJson['id']})">
        <h2>${rename}</h2>
        <img class="pokeImage" src="${responseAsJson['sprites']['other']['official-artwork']['front_shiny']}">
      
    </div>`;
    setBackground(responseAsJson['types']['0']['type']['name'], i);
    console.log(responseAsJson);
}

async function renderBig(pokemonId){
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json();
    let rename = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1);
    document.getElementById('fullscreen').style.display = "flex";
    document.getElementById('fullscreen').innerHTML = `
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
    `;
    setBackgroundBig(pokemonData['types']['0']['type']['name']);
}

async function renderDetails(pokemonId) {
    document.getElementById('statsArea').style.display = "none";
    document.getElementById('details').style.display = "block";
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json(); 
    let table = document.createElement('tbody');
    table.innerHTML = `<tr><td>Height: </td><td>${pokemonData['height']*10} cm</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Weight: </td><td>${pokemonData['weight']} kg</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Base Exp.: </td><td>${pokemonData['base_experience']}</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Abilities: </td><td>${pokemonData['abilities']['0']['ability']['name']}</td><td> </td></tr>`;
    table.innerHTML += `<tr><td>Form: </td><td>${pokemonData['forms']['0']['name']}</td><td> </td></tr>`;
    document.getElementById('details').innerHTML = '';
    document.getElementById('details').appendChild(table);
}

async function renderStats(pokemonId, index) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json();
    document.getElementById('details').style.display = "none";
    document.getElementById('statsArea').style.display = "block";
    let ctx = document.getElementById('statsArea');
    ctx.innerHTML = '';

    let rowData = [];
    for (let i = 0; i < 6; i++) {
        rowData.push(pokemonData['stats'][i]['base_stat'])
    }
    console.log(rowData);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defence', 'Special Attack', 'Special Defence', 'Speed'],
            datasets: [{
                data: rowData,
                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend:{
                    labels:{
                        font: {size: 0}
                    }
                }
            },
            scales: {
                x: {display: false},
            },
        }
    });

}

function randomCards() {
    do {
        randomNumber = Math.floor(Math.random() * 1024);
    } while (generatedNumbers.includes(randomNumber));
    generatedNumbers.push(randomNumber);
    return randomNumber;
}

function barChart(index) {
    let percent = (index / 255) * 100;

    // Erstellen des HTML-Elements für den Balken
    let bar = document.createElement('div');
    bar.style.width = percent + "%";
    bar.style.height = "8px";
    bar.style.backgroundColor = "blue";
    bar.style.boxShadow = " 0px 0px 4px rgb(252, 252, 252)";

    // Erstellen des HTML-Elements für die Zelle in der Tabelle
    let cell = document.createElement('tr');

    // Hinzufügen des Balkens zur Zelle
    cell.appendChild(bar);

    // Rückgabe der Zelle mit dem Balken
    return cell;
}

function displayOff(){
    document.getElementById('fullscreen').style.display = "none";
}

async function pokeQuery(){
    searchPoke = document.getElementById('searchQuery').value;
    document.getElementById('cards').innerHTML = '';
    let url = `https://pokeapi.co/api/v2/pokemon/` + searchPoke;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    if(searchPoke==``){
        renderPokedeck();
    }
    if(response.status != 4){
        renderCard(responseAsJson);
    }
    
}