exports.seed = function  (knex, Promise) {
  return knex("pokemons")
    .truncate()
    .then(function() {
        return knex("pokemons").insert([
            { name: "Bulbasaur" },
            { name: "Ivysaur" },
            { name: "Venusaur" },
            { name: "Charmander" },
            { name: "Charmeleon" },
            { name: "Charizard" },
            { name: "Squirtle" },
            { name: "Wartortle" },
            { name: "Blastoise" },
        ])
    })
}