const server = require("./server")
const request = require("supertest")
const db = require("../data/dbConfig")

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

it("process.env.DB_ENV must be 'testing'", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("pokemons endpoints", () => {
    describe("[GET] /api/pokemons", () => {
        it("returns all the pokemons", async () => {
            const res = await request(server).get("/api/pokemons")
            expect(res.body).toHaveLength(9)
        })
    })
    describe("[POST] /api/pokemons", () => {
        it("returns pokemons lengths + 1", async () => {
            //const Caterpie = { name: "Caterpie" }
        })
    })
    describe("[DELETE] /api/pokemons", () => {
        
    })
})
