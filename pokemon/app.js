const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name')
const pokemon = Pokemon.getByName(pokemonName)
const releaseButton = document.getElementById('releaseBtn')
const editButton = document.getElementById('editBtn')
const addMoveButton = document.getElementById('add-move')
const editMoveButton = document.getElementById('edit-move')

function loadMoves() {
    const movesContainer = document.getElementById('moves-container')
    movesContainer.innerHTML = ''
    for (const move of pokemon.moves) {
        const retreatIcon = "O ".repeat(move.retreat)
        console.log(retreatIcon, move.retreat);
        movesContainer.innerHTML += `
    <div class="move">
      <h3 class="move-title">${retreatIcon} &emsp; ${move.name} &emsp; ${move.damage}</h3>
      <div class="move-ability">
        <h4 style="margin: 1px;">Ability:</h4>
        <p style="margin: 3px;">Increase damage +50</p>
        <button id="edit-btn">Edit</button>
        <button id="remove-btn">Remove</button>
      </div>
    </div>
    `
    }
}

function loadDetails() {
    const name = document.getElementById('name')
    const level = document.getElementById('level')
    const health = document.getElementById('health')
    const dodging = document.getElementById('dodging')
    const retreat = document.getElementById('retreat')

    name.innerHTML = pokemon.name
    level.innerHTML = pokemon.level
    health.innerHTML = pokemon.health
    dodging.innerHTML = pokemon.dodgingLevel
    retreat.innerHTML = pokemon.retreat
    loadMoves()
}


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


addMoveButton.addEventListener('click', () => {
    const addMoveForm = document.getElementById('add-move-form')
    const saveButton = document.getElementById('save-move-btn')
    const cancelButton = document.getElementById('cancel-move-save-btn')

    addMoveForm.style.display = 'block'
    
    cancelButton.addEventListener('click', () => {
      addMoveForm.style.display = 'none'
    })

    saveButton.addEventListener('click', () => {
        const nameInp = document.getElementById('nameInp')
        const damageInp = document.getElementById('damageInp')
        const retreatInp = document.getElementById('retreatInp')
        const abilityInp = document.getElementById('abilityInp')
        console.log(retreatInp.value);
        pokemon.moves.push({
            name: nameInp.value,
            damage: parseInt(damageInp.value),
            retreat: parseInt(retreatInp.value),
            ability: abilityInp.value
        })
        console.log(pokemon.moves);
        pokemon.save()
        addMoveForm.style.display = 'none'
        window.location = '/pokemon/?name=' + pokemon.name
    })
})

// editMoveButton.addEventListener('click', () => {
//     const levelInp = document.getElementById('levelInp')
//     const healthInp = document.getElementById('healthInp')
//     const dodgingLevelInp = document.getElementById('dodgingLevelInp')
//     const retreatInp = document.getElementById('retreatInp')
      
//     levelInp.value = pokemon.level
//     healthInp.value = pokemon.initialHealth
//     dodgingLevelInp.value = pokemon.dodgingLevel
//     retreatInp.value = pokemon.retreat
    
//     editPokemonForm = document.getElementById('edit-pokemon-form')
//     saveButton = document.getElementById('save-btn')
//     cancelButton = document.getElementById('cancel-btn')

//     editPokemonForm.style.display = 'block'
    
//     cancelButton.addEventListener('click', () => {
//       editPokemonForm.style.display = 'none'
//     })

//     saveButton.addEventListener('click', () => {
//         pokemon.level = parseInt(levelInp.value),
//         pokemon.initialHealth = parseInt(healthInp.value),
//         pokemon.dodgingLevel = parseInt(dodgingLevelInp.value),
//         pokemon.retreat = parseInt(retreatInp.value)
//         pokemon.save()
//         editPokemonForm.style.display = 'none'
//         window.location = '/pokemon/?name=' + pokemon.name
//     })
// })