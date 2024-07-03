class Pokemon {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.level = data.level
        this.initialHealth = data.initialHealth
        this.dodgingLevel = data.dodgingLevel
        this.retreat = data.retreat
        this.moves = data.moves ?? []
    }
    
    static raw() {
      return localStorage.getItem('pokemons')
    }

    static all() {
        const rawPokemons = this.raw()
        const pokemonsData = rawPokemons ? JSON.parse(rawPokemons) : []
        if (!Array.isArray(pokemonsData)) return []
        return pokemonsData.map(pokemonData => new Pokemon(pokemonData))
    }
    
    static sync(pokemons) {
      pokemons = typeof pokemons === "string"
        ? pokemons
        : JSON.stringify(pokemons)
      localStorage.setItem('pokemons', pokemons)
      return pokemons
    }
    
    static create(data) {
      const pokemons = this.all()
      const idExists = pokemons.some(existingPokemon => 
        existingPokemon.id === data.id
      )
      if (idExists) {
        throw new Error("Pokemon already exists on your dex")
      }
      const pokemon = new this(data)
      pokemons.push(pokemon)
      this.sync(pokemons)
      return pokemon
    }
    
    static find(id) {
      return this.all().find(pokemon => pokemon.id === id)
    }
    
    get health() {
      return this.initialHealth + this.#calculateHealthBonusForLevel()
    }
    
    save() {
      let pokemons = this.constructor.all()
      pokemons = pokemons.map(pokemon => {
        if (pokemon.id === this.id) return this
        return pokemon
      })
      this.constructor.sync(pokemons)
    }
    
    release() {
      const pokemons = this.constructor.all().filter(pokemon => pokemon.name !== this.name)
      this.constructor.sync(pokemons)
    }
    
    findMove(id) {
      console.log(id, this.moves)
      return this.moves.find(move => move.id === id)
    }
    
    removeMove(id) {
      this.moves = this.moves.filter(move => move.id !== id)
      this.save()
    }
    
    updateMove(id, data) {
      this.moves = this.moves.map(move => {
        if (move.id !== id) return move
        return Object.assign(move, data)
      })
      this.save()
    }
    
    #calculateHealthBonusForLevel() {
      return (this.level - 1) * 50
    }
    
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        level: this.level,
        initialHealth: this.initialHealth,
        dodgingLevel: this.dodgingLevel,
        retreat: this.retreat,
        moves: this.moves
      }
    }
}
