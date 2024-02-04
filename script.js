let randomNumber;

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
    <div id="poke${i}" class="pokeCard">
    <h2>${rename}</h2>
    <img class="pokeImage" src="${responseAsJson['sprites']['other']['official-artwork']['front_shiny']}"
        <div class=""stats">
            <table>
                <tr><th>${responseAsJson['stats']['0']['stat']['name']}: </th><th>${responseAsJson['stats']['0']['base_stat']}</th></tr>
                <tr><th>${responseAsJson['stats']['1']['stat']['name']}: </th><th>${responseAsJson['stats']['1']['base_stat']}</th></tr>
                <tr><th>${responseAsJson['stats']['2']['stat']['name']}: </th><th>${responseAsJson['stats']['2']['base_stat']}</th></tr>
                <tr><th>${responseAsJson['stats']['3']['stat']['name']}: </th><th>${responseAsJson['stats']['3']['base_stat']}</th></tr>
                <tr><th>${responseAsJson['stats']['4']['stat']['name']}: </th><th>${responseAsJson['stats']['4']['base_stat']}</th></tr>
                <tr><th>${responseAsJson['stats']['5']['stat']['name']}: </th><th>${responseAsJson['stats']['5']['base_stat']}</th></tr>
            </table>            
        </div>
    </div>`;
    setBackground(responseAsJson['types']['0']['type']['name'], i);
    console.log(responseAsJson);
    console.log(responseAsJson['types']['0']['type']['name']);
}

function randomCards() {
    randomNumber = Math.floor(Math.random() * 1024);
}

function setBackground(index, i){
    if (index === 'fire'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/fire.png)";};
    if (index === 'electric'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/elektric.png)";};
    if (index === 'water'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/water.png)";};
    if (index === 'poison'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/poison.png)";};
    if (index === 'fighting'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/fight.png)";};
    if (index === 'psychic'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/psychic.png)";};
    if (index === 'fairy'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/fairy.png)";};
    if (index === 'ghost'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/ghost.png)";};
    if (index === 'dragon'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/dragon.png)";};
    if (index === 'ice'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/ice.png)";};
    if (index === 'bug'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/bug.png)";};
    if (index === 'grass'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/grass.png)";};
    if (index === 'rock'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/ice.png)";};
    if (index === 'steel'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/steel.png)";};
    if (index === 'rock'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/rock.png)";};
    if (index === 'ground'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/ground.png)";};
    if (index === 'dark'){document.getElementById(`poke${i}`).style.backgroundImage ="url(img/dark.png)";};
}
