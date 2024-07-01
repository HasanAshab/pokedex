const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name')

const pokemon = Pokemon.getByName(pokemonName)
const name = document.getElementById('name')
const level = document.getElementById('level')
const health = document.getElementById('health')
const dodging = document.getElementById('dodging')
const retreat = document.getElementById('retreat')
const releaseButton = document.getElementById('releaseBtn')
const editButton = document.getElementById('editBtn')


name.innerHTML = pokemon.name
level.innerHTML = pokemon.level
health.innerHTML = pokemon.health
dodging.innerHTML = pokemon.dodgingLevel
retreat.innerHTML = pokemon.retreat


releaseButton.addEventListener('click', () => {
  res = confirm("Do you really want to relase?")
  if (res) {
  pokemon.release()
  window.location = '/'
  }
})


editButton.addEventListener('click', () => {
    const levelInp = document.getElementById('levelInp')
    const healthInp = document.getElementById('healthInp')
    const dodgingLevelInp = document.getElementById('dodgingLevelInp')
    const retreatInp = document.getElementById('retreatInp')
      
    levelInp.value = pokemon.level
    healthInp.value = pokemon.initialHealth
    dodgingLevelInp.value = pokemon.dodgingLevel
    retreatInp.value = pokemon.retreat
    
    editPokemonForm = document.getElementById('edit-pokemon-form')
    saveButton = document.getElementById('save-btn')
    cancelButton = document.getElementById('cancel-btn')

    editPokemonForm.style.display = 'block'
    
    cancelButton.addEventListener('click', () => {
      editPokemonForm.style.display = 'none'
    })

    saveButton.addEventListener('click', () => {
        pokemon.level = parseInt(levelInp.value),
        pokemon.initialHealth = parseInt(healthInp.value),
        pokemon.dodgingLevel = parseInt(dodgingLevelInp.value),
        pokemon.retreat = parseInt(retreatInp.value)
        pokemon.save()
        editPokemonForm.style.display = 'none'
        window.location = '/pokemon/?name=' + pokemon.name
    })
})
