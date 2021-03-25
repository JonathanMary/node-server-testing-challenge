const express = require("express")
const server = express()
const pokeModel = require("./pokemons/pokemons-model")

server.use(express.json())

server.get("/api/pokemons", (req, res) => {
    pokeModel.getAll()
             .then(arr => {
                 res.status(200).json(arr)
             })
             .catch(err => {
                 res.status(500).json({
                     message: err.message
                 })
             })
})

server.use("/", (req, res) => {
    res.json({ api: "up" })
})

module.exports = server