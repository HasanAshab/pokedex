const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name')
const pokemon = Pokemon.getByName(pokemonName)
const name = document.getElementById('name')
const level = document.getElementById('level')
const health = document.getElementById('health')
const dodging = document.getElementById('dodging')
const retreat = document.getElementById('retreat')
const releaseButton = document.getElementById('releaseBtn')

name.innerHTML = pokemon.name
level.innerHTML = pokemon.level
health.innerHTML = pokemon.health
dodging.innerHTML = pokemon.dodgingLevel
retreat.innerHTML = pokemon.retreat


releaseButton.addEventListener('click', () => {
  pokemon.release()
  window.location = '/'
})