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




app.listen(45789, () => {
    console.log("API RODANDO")
})