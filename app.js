const pokemonContainer = document.getElementById('pokemons-container')
const addPokemonButton = document.getElementById('add-pokemon')
const pokemonBox = document.getElementsByClassName('pokemon')

function addPokemon(pokemon) {
  pokemonContainer.innerHTML += `
  <div class="pokemon" onclick="window.location = 'pokemon/?name=${pokemon.name}'">
      <h1>${pokemon.name}</h1>
      <h3>Level: ${pokemon.level}</h3>
      <h3>Health: ${pokemon.health}</h3>
  </div>
  `
}

function loadPokemons() {
  pokemonContainer.innerHTML = ''
  Pokemon.all().forEach(addPokemon)
}

addPokemonButton.addEventListener('click', () => {
    addPokemonForm = document.getElementById('add-pokemon-form')
    submitPokemonButton = document.getElementById('submit-pokemon')
    cancelSubmitPokemonButton = document.getElementById('cancel-submit-pokemon')

    addPokemonForm.style.display = 'block'
    
    cancelSubmitPokemonButton.addEventListener('click', () => {
      addPokemonForm.style.display = 'none'

    })

    submitPokemonButton.addEventListener('click', () => {
        const nameBar = document.getElementById('nameBar')
        const levelBar = document.getElementById('levelBar')
        const healthBar = document.getElementById('healthBar')
        const dodgingLevelBar = document.getElementById('dodgingLevelBar')
        const retreatBar = document.getElementById('retreatBar')

        Pokemon.create({
            name: nameBar.value,
            level: parseInt(levelBar.value),
            initialHealth: parseInt(healthBar.value),
            dodgingLevel: parseInt(dodgingLevelBar.value),
            retreat: parseInt(retreatBar.value)
        })
        addPokemonForm.style.display = 'none'
        loadPokemons()
    })
})
