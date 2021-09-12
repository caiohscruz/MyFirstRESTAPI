const express = require("express")
const app = express()
const path = require('path')

// setting cors to consume from this api
const cors = require("cors")
app.use(cors())

// Settings to use forms - begin
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
// Settings to use forms - end

// Setting View Engine - begin
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// Setting View Engine - end

const connection = require("./database/database")
const games = require("./database/games")

// Conecction test - begin
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
// Conecction test - end

app.get("/", (req, res) => {
    res.render("index.ejs")
})

// list all games - begin
app.get("/games", async (req, res) => {
    await games.findAll({
        raw: true
    }).then(result => {
        if (result != undefined) {
            res.statusCode = 200
            res.json(result)
        } else {
            res.sendStatus(404)
        }
    })
})
// list all games - end

// list a specifyc game - begin
app.get("/game/:id", async (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        await games.findOne({
            raw: true,
            where: {
                id: id
            }
        }).then(result => {
            if (result != undefined) {
                res.statusCode = 200
                res.json(result)
            } else {
                res.sendStatus(404)
            }
        })
    }
})
// list  a specifyc game - end

// create a game - begin
app.post("/game", (req, res) => {

    var {
        title,
        year,
        price
    } = req.body

    games.create({
        title: title,
        year: year,
        price: price
    }).then(() => {
        res.sendStatus(200)
    })
})
// create a game - end

// delete a game - begin
app.delete("/game/:id", async (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        await games.findOne({
            raw: true,
            where: {
                id: id
            }
        }).then(async result => {
            if (result != undefined) {
                await games.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.sendStatus(200)
                })
            } else {
                res.sendStatus(404)
            }
        })
    }
})
// delete a game - begin

// update a game - begin
app.put("/game/:id", async (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)


        if (game == undefined) {
            res.sendStatus(404)
        } else {
            var {
                title,
                year,
                price
            } = req.body

            await games.findOne({
                raw: true,
                where: {
                    id: id
                }
            }).then(async result => {
                if (result != undefined) {
                    await games.update({
                        title: title,
                        year: year,
                        price: price
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })
                } else {
                    res.sendStatus(404)
                }
            })
        }
    }
})
// update a game - begin

app.listen(process.env.PORT ||45789, () => {
    console.log("API RODANDO")
})