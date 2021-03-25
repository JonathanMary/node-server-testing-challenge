const db = require("../../data/dbConfig")

function getAll() {
    return db("pokemons")
}
async function insert(obj) {
    const [id] = await db("pokemons")
        .insert(obj)
    return db("pokemons")
        .where("id", id).first()
}
async function removeById(id) {
    const savedPokemon = await db("pokemons")
        .where("id", id).first()
    await db("pokemons")
        .where("id", id)
        .del()
    return savedPokemon
}

module.exports = {
    getAll,
    insert,
    removeById,
}
