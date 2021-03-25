const pokeModel = require("./pokemons-model")
const db = require("../../data/dbConfig")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("pokemons").truncate()
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("Pokemons model", () => {
    it("works", () => {
        expect(true).toBe(true)
    })
    describe("getAll", () => {
        let pokemons
        beforeEach(async () => {
            pokemons = await pokeModel.getAll()
        })
        it("can retrieve all pokemons from db", async () => {
            expect(pokemons).toHaveLength(9)
        })
        it("retrieves pokemons with id, names", async () => {
            expect(pokemons[0]).toMatchObject({ id: 1, name: "Bulbasaur" })
            expect(pokemons[1]).toMatchObject({ id: 2, name: "Ivysaur" })
        })
    })
    describe("insert", () => {
        const caterpie = { name: "Caterpie" }
        it("creates a new pokemon into db", async () => {
            await pokeModel.insert(caterpie)
            expect(await db("pokemons")).toHaveLength(10)
            expect((await db("pokemons"))[9]).toMatchObject({ id: 10, name: "Caterpie" })
        })
        it("returns the newly created pokemon", async () => {
            const newCaterpire = await pokeModel.insert(caterpie)
            expect(newCaterpire).toMatchObject({ id: 10, name: "Caterpie" })
        })
    })
    describe("remove", () => {
        it("removes a pokemon from the database", async () => {
            await pokeModel.removeById(1)
            expect(await db("pokemons")).toHaveLength(8)
            expect((await db("pokemons"))[0]).not.toMatchObject({ id: 1, name: "Bulbasaur" })
            expect((await db("pokemons"))[0]).toMatchObject({ id: 2, name: "Ivysaur" })
        })
        it("returns the deleted pokemon", async () => {
            const deleted = await pokeModel.removeById(1)
            expect(deleted).toMatchObject({ id: 1, name: "Bulbasaur" })
        })
    })
})
