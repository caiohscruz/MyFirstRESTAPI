const express = require("express")
const app = express()

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

    var {title, year, price} = req.body

    DB.games.push({
        id: 234,
        title,
        year,
        price
    })

    res.sendStatus(200)
})
// create a game - end


app.listen(45789, () => {
    console.log("API RODANDO")
})