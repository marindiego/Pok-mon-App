const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonsUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonImageContainer = document.getElementById('pokemon-image-container');
const pokemonTypeContainer = document.getElementById('types');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');


const pokemonCardInformationTextContent = (pokemonData) => {
    pokemonName.textContent = pokemonData.name.toUpperCase();
    pokemonId.textContent = "#" + pokemonData.id;
    pokemonWeight.textContent = "Weight: " + pokemonData.weight;
    pokemonHeight.textContent = "Height: " +pokemonData.height;
    pokemonImageContainer.innerHTML = `<img src="${pokemonData.sprites.front_default}" id="sprite" class="pokemon-image"> alt="${pokemonData.name} front default sprite"`;
    pokemonHp.textContent = pokemonData.stats.find(base_stat => base_stat.stat.name === "hp").base_stat;
    pokemonAttack.textContent = pokemonData.stats.find(base_stat => base_stat.stat.name === "attack").base_stat;
    pokemonDefense.textContent = pokemonData.stats.find(base_stat => base_stat.stat.name === "defense").base_stat;
    pokemonSpecialAttack.textContent = pokemonData.stats.find(base_stat => base_stat.stat.name === "special-attack").base_stat;
    pokemonSpecialDefense.textContent = pokemonData.stats.find(base_stat => base_stat.stat.name === "special-defense").base_stat;
    pokemonSpeed.textContent = pokemonData.stats.find(base_stat => base_stat.stat.name === "speed").base_stat;
    pokemonTypeContainer.innerHTML = pokemonData.types.map(type => `<span class="${type.type.name}">${type.type.name.toUpperCase()}</span>`).join('');
}

const searchPokemonById = (id) => {
    fetch(pokemonsUrl + "/" + id)
        .then((res) => res.json())
        .then((pokemonData) => {
            pokemonCardInformationTextContent(pokemonData);
        })
        .catch(error => alert("Pokemon not found aqui")
        );
    }
const searchPokemonByName = (name) => {
    fetch(pokemonsUrl + "/" + name.toLowerCase())
        .then((res) => res.json())
        .then((pokemonData) => {
            pokemonCardInformationTextContent(pokemonData); 
        })
        .catch(error => alert("Pokemon not found")
        );
}
searchBtn.addEventListener("click", () => {
    const searchValue = searchInput.value;
    if (searchValue.length > 0) {
        if (parseInt(searchValue)) {
            searchPokemonById(searchValue);
        } else {
            searchPokemonByName(searchValue);
        }  
    } else {
        alert("Please enter a pokemon name or id");
    }
});
searchBtn.addEventListener("submit",(e) => {
    e.preventDefault();
    if (e.key === "Enter"){
        const searchValue = searchInput.value;
            if (searchValue.length > 0) {
                if (parseInt(searchValue)) {
                    searchPokemonById(searchValue);
                } else {
                    searchPokemonByName(searchValue);
                }  
            } else {
                alert("Please enter a pokemon name or id");
            return
        }
    }
})