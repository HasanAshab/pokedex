const dataInp = document.getElementById('dataInp')
const saveButton = document.getElementById('saveBtn')
const syncFileButton = document.getElementById('syncFileBtn')
const exportButton = document.getElementById('exportBtn')
const importButton = document.getElementById('importBtn')
const importFileInp = document.getElementById('importFile')

function setData() {
  dataInp.value = JSON.stringify(Pokemon.all(), undefined, 2)
}

saveButton.addEventListener('click', () => {
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

exportButton.addEventListener('click', () => {
  const data = JSON.stringify(Pokemon.all(), undefined, 2)
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "pokemons.json"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})

importButton.addEventListener('click', () => {
  importFileInp.click()
})

importFileInp.addEventListener('change', () => {
    const file = importFileInp.files[0]
  console.log(file);
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    const data = reader.result
    Pokemon.sync(data)
    setData()
  })
  reader.readAsText(file)
})

setData()