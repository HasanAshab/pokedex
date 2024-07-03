const dataInp = document.getElementById('dataInp')
const syncButton = document.getElementById('syncBtn')
const syncFileButton = document.getElementById('syncFileBtn')


function setData() {
  dataInp.value = JSON.stringify(Pokemon.all(), undefined, 2)
}

syncButton.addEventListener('click', () => {
  const res = confirm("You are going to change data of pokedex!")
  if (!res) setData()
  const data = JSON.stringify(
    JSON.parse(dataInp.value)
  )
  Pokemon.sync(data)
})


syncFileButton.addEventListener('click', async () => {
  const res = confirm("You are going to change data of pokedex!")
  if (!res) return
  
  const rawData = await fetch("/data.json")
  const data = JSON.stringify(await rawData.json())
  Pokemon.sync(data)
  setData()
})

setData()