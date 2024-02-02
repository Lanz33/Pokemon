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
    console.log(responseAsJson['sprites']['front_shiny']);
    console.log(responseAsJson);
}

function randomCards() {
    randomNumber = Math.floor(Math.random() * 1024);
    console.log(randomNumber);
}
