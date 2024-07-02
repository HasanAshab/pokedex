const foodCostBar = document.getElementById('food-cost-bar')
const pokemonContainer = document.getElementById('pokemons-container')
const addPokemonButton = document.getElementById('add-pokemon')
const pokemonBox = document.getElementsByClassName('pokemon')

function addPokemon(pokemon) {
  pokemonContainer.innerHTML += `
  <div class="pokemon" onclick="window.location = 'pokemon/?id=${pokemon.id}'">
      <h1>${pokemon.name}</h1>
      <h3>Level: ${pokemon.level}</h3>
      <h3>Health: ${pokemon.health}</h3>
  </div>
  `
}

function loadPokemons() {
  pokemonContainer.innerHTML = ''
  Pokemon.all().sort((p1, p2) => p2.level - p1.level).forEach(addPokemon)
}

foodCostBar.innerHTML = Pokemon.all().reduce((total, pokemon) => {
  return total + (pokemon.health * 10)
}, 0)

addPokemonButton.addEventListener('click', () => {
    addPokemonForm = document.getElementById('add-pokemon-form')
    submitPokemonButton = document.getElementById('submit-pokemon')
    cancelSubmitPokemonButton = document.getElementById('cancel-submit-pokemon')

    addPokemonForm.style.display = 'block'
    
    cancelSubmitPokemonButton.addEventListener('click', () => {
      addPokemonForm.style.display = 'none'

    })

    submitPokemonButton.addEventListener('click', () => {
        const idBar = document.getElementById('idBar')
        const nameBar = document.getElementById('nameBar')
        const levelBar = document.getElementById('levelBar')
        const healthBar = document.getElementById('healthBar')
        const dodgingLevelBar = document.getElementById('dodgingLevelBar')
        const retreatBar = document.getElementById('retreatBar')
        const pokemon = Pokemon.create({
            id: idBar.id,
            name: nameBar.value,
            level: parseInt(levelBar.value),
            initialHealth: parseInt(healthBar.value),
            dodgingLevel: parseInt(dodgingLevelBar.value),
            retreat: parseInt(retreatBar.value)
        })
        addPokemonForm.style.display = 'none'
        window.location = '/pokemon/?id=' + pokemon.id
    })
})


loadPokemons()