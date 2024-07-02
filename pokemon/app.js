const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')
const pokemon = Pokemon.find(id)
const releaseButton = document.getElementById('releaseBtn')
const editButton = document.getElementById('editBtn')
const addMoveButton = document.getElementById('add-move')
const editMoveButton = document.getElementById('edit-move')


function removeMove(id) {
  pokemon.removeMove(id)
  location.reload()
}

function editMove(id) {
  const move = pokemon.findMove(id)
  const nameInp = document.getElementById('nameInp-edit')
  const damageInp = document.getElementById('damageInp-edit')
  const retreatInp = document.getElementById('retreatInp-edit')
  const abilityInp = document.getElementById('abilityInp-edit')
  
  nameInp.value = move.name  
  damageInp.value = move.damage  
  retreatInp.value = move.retreat  
  abilityInp.value = move.ability  
  
  const editMoveForm = document.getElementById('edit-move-form')
  const saveButton = document.getElementById('save-edit-move-btn')
  const cancelButton = document.getElementById('cancel-edit-move-btn')
  
  editMoveForm.style.display = 'block'
  
  cancelButton.addEventListener('click', () => {
    editMoveForm.style.display = 'none'
  })
  
  saveButton.addEventListener('click', () => {
    pokemon.updateMove(id, {
      name: nameInp.value,
      damage: parseInt(damageInp.value),
      retreat: parseInt(retreatInp.value),
      ability: abilityInp.value
    })
    editMoveForm.style.display = 'none'
    location.reload()
  })
}

function loadMoves() {
  const movesContainer = document.getElementById('moves-container')
  movesContainer.innerHTML = ''
  for (const move of pokemon.moves) {
    const retreatIcon = "* ".repeat(move.retreat)
    movesContainer.innerHTML += `
    <div class="move">
      <h3 class="move-title">${retreatIcon} &emsp; ${move.name} &emsp; ${move.damage}</h3>
      ${
      move.ability ?
      `<div class="move-ability">
        <h4 style="margin: 1px;">Ability:</h4>
        <p style="margin: 3px;">${move.ability}</p>
      </div>` : ''
      }
      <button onclick="editMove('${move.id}')">Edit</button>
      <button onclick="removeMove('${move.id}')">Remove</button>
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
  const nameInp = document.getElementById('nameInp')
  const levelInp = document.getElementById('levelInp')
  const healthInp = document.getElementById('healthInp')
  const dodgingLevelInp = document.getElementById('dodgingLevelInp')
  const retreatInp = document.getElementById('retreatInp')

  nameInp.value = pokemon.name
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
    pokemon.name = nameInp.value
    pokemon.level = parseInt(levelInp.value)
    pokemon.initialHealth = parseInt(healthInp.value)
    pokemon.dodgingLevel = parseInt(dodgingLevelInp.value)
    pokemon.retreat = parseInt(retreatInp.value)
    pokemon.save()
    editPokemonForm.style.display = 'none'
    location.reload()
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
    const idInp = document.getElementById('idInp')
    const nameInp = document.getElementById('nameInp-move')
    const damageInp = document.getElementById('damageInp')
    const retreatInp = document.getElementById('retreatInp-add')
    const abilityInp = document.getElementById('abilityInp')
    pokemon.moves.push({
      id: idInp.value,
      name: nameInp.value,
      damage: parseInt(damageInp.value),
      retreat: parseInt(retreatInp.value),
      ability: abilityInp.value
    })
    pokemon.save()
    addMoveForm.style.display = 'none'
    location.reload()
  })
})