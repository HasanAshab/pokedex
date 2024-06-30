class Pokemon {
    constructor(data) {
        this.name = data.name
        this.level = data.level
        this.initialHealth = data.initialHealth
        this.dodgingLevel = data.dodgingLevel
        this.retreat = data.retreat
    }

    static all(pojo = false) {
        const rawPokemons = localStorage.getItem('pokemons')
        const pokemonsData = rawPokemons ? JSON.parse(rawPokemons) : []
        if (pojo) return pokemonsData
        return pokemonsData.map(pokemonData => new Pokemon(pokemonData))
    }
    
    static sync(pokemons) {
      localStorage.setItem('pokemons', JSON.stringify(pokemons))
      return pokemons
    }
    
    static create(data) {
      const pokemon = new this(data)
      const pokemons = this.all()
      const pokemonExists = pokemons.some(existingPokemon => 
        existingPokemon.name === pokemon.name
      )
      if (pokemonExists) {
        throw new Error("Pokemon already exists on your dex")
      }
      pokemons.push(pokemon)
      this.sync(pokemons)
      return pokemon
    }
    
    static getByName(name) {
      return this.all().filter(pokemon => pokemon.name === name)[0] ?? null
    }
    
    get health() {
      return this.initialHealth + this.#calculateHealthBonusForLevel()
    }
    
    release() {
      const pokemons = this.constructor.all().filter(pokemon => pokemon.name !== this.name)
      console.log(pokemons)
      this.constructor.sync(pokemons)
    }
    
    #calculateHealthBonusForLevel() {
      return (this.level - 1) * 50
    }
    
    toJSON() {
      return {
        name: this.name,
        level: this.level,
        initialHealth: this.initialHealth,
        dodgingLevel: this.dodgingLevel,
        retreat: this.retreat
      }
    }
}
