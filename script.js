let randomNumber;

async function renderPokedeck() {
    for (let i = 0; i < 30; i++) {
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
    <div id="poke${i}" class="pokeCard">
        <h2>${rename}</h2>
        <img class="pokeImage" src="${responseAsJson['sprites']['other']['official-artwork']['front_shiny']}">
        <div class="headLine">
            <div onclick="renderDetails(${responseAsJson['id']}, ${i})">Details</div>
            <div onclick="renderStats(${responseAsJson['id']}, ${i})">Stats</div>
        </div>
        <div id="displayStats${i}"></div>    
    </div>`;
    setBackground(responseAsJson['types']['0']['type']['name'], i);
    console.log(responseAsJson);
}

async function renderStats(pokemonId, index) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json();
    let table = document.createElement('table');
    for (let i = 0; i < 6; i++) {
        let statName = pokemonData['stats'][i]['stat']['name'];
        let statValue = pokemonData['stats'][i]['base_stat'];
        let barHtml = barChart(statValue).innerHTML;
        let row = document.createElement('tr');
        row.innerHTML += `<td>${statName}:</td><td>${barHtml}</td><td>${statValue}</td>`;
        table.appendChild(row);
    }
    document.getElementById(`displayStats${index}`).innerHTML ='';
    document.getElementById(`displayStats${index}`).appendChild(table);
}

async function renderDetails(pokemonId, index){
    let url = `https://pokeapi.co/api/v2/pokemon/` + pokemonId;
    let responseStats = await fetch(url);
    let pokemonData = await responseStats.json();
    let table = document.createElement('table');
    table.innerHTML = `<tr><td>Height: </td><td>${pokemonData['height']}</td></tr>`;
    table.innerHTML += `<tr><td>Weight: </td><td>${pokemonData['weight']}</td></tr>`;
    table.innerHTML += `<tr><td>Base Exp.: </td><td>${pokemonData['base_experience']}</td></tr>`;
    table.innerHTML += `<tr><td>Abilities: </td><td>${pokemonData['abilities']['0']['ability']['name']}</td>`;
    table.innerHTML += `<tr><td>Form: </td><td>${pokemonData['forms']['0']['name']}</td></tr>`;
    document.getElementById(`displayStats${index}`).innerHTML ='';
    document.getElementById(`displayStats${index}`).appendChild(table);
}

function randomCards() {
    randomNumber = Math.floor(Math.random() * 1024);
}


function setBackground(index, i) {
    if (index === 'fire') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/fire.png)"; };
    if (index === 'electric') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/elektric.png)"; };
    if (index === 'water') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/water.png)"; };
    if (index === 'poison') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/poison.png)"; };
    if (index === 'fighting') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/fight.png)"; };
    if (index === 'psychic') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/psychic.png)"; };
    if (index === 'fairy') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/fairy.png)"; };
    if (index === 'ghost') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/ghost.png)"; };
    if (index === 'dragon') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/dragon.png)"; };
    if (index === 'ice') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/ice.png)"; };
    if (index === 'bug') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/bug.png)"; };
    if (index === 'grass') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/grass.png)"; };
    if (index === 'steel') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/steel.png)"; };
    if (index === 'rock') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/rock.png)"; };
    if (index === 'ground') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/ground.png)"; };
    if (index === 'dark') { document.getElementById(`poke${i}`).style.backgroundImage = "url(img/dark.png)"; };
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

