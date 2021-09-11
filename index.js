const express = require("express")
const app = express()

// setting cors to consume from this api
const cors = require("cors")
app.use(cors())

// Settings to use forms - begin
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Settings to use forms - end

var DB = {
    games: [{
            id: 1,
            title: "GoW",
            year: 2019,
            price: 59
        },
        {
            id: 2,
            title: "KoF",
            year: 1997,
            price: 30
        },
        {
            id: 3,
            title: "CoD",
            year: 2020,
            price: 70
        },
        {
            id: 4,
            title: "PoP",
            year: 2014,
            price: 40
        }

    ]
}

// list all games - begin
app.get("/games", (req, res) => {
    res.statusCode = 200
    res.json(DB.games)
})
// list all games - end

// list a specifyc game - begin
app.get("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if (game != undefined) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
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

    DB.games.push({
        id: 234,
        title,
        year,
        price
    })

    res.sendStatus(200)
})
// create a game - end

// delete a game - begin
app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if (index == -1) {
            res.sendStatus(404)
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})
// delete a game - begin

// update a game - begin
app.put("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)

        if (game == undefined) {
            res.sendStatus(404)
        } else {
            var {
                title,
                year,
                price
            } = req.body

            if (title != undefined) {
                if (year != undefined) {
                    if (!isNaN(year)) {
                        if (price != undefined) {
                            if (!isNaN(price)) {
                                res.sendStatus(200)
                                game.title = title
                                game.year = year
                                game.price = price
                            } else {
                                res.sendStatus(400)
                            }
                        } else {
                            res.sendStatus(200)
                            game.title = title
                            game.year = year
                        }
                    } else {
                        res.sendStatus(400)
                    }
                } else {
                    res.sendStatus(200)
                    game.title = title
                }
            } else {
                if (year != undefined) {
                    if (!isNaN(year)) {
                        if (price != undefined) {
                            if (!isNaN(price)) {
                                res.sendStatus(200)
                                game.year = year
                                game.price = price
                            } else {
                                res.sendStatus(400)
                            }
                        } else {
                            res.sendStatus(200)
                            game.year = year
                        }
                    } else {
                        res.sendStatus(400)
                    }
                } else {
                    res.sendStatus(400)
                }
            }

        }
    }
})
// update a game - begin

app.listen(45789, () => {
    console.log("API RODANDO")
})