const express = require("express")
const app = express()
const path = require('path')

// setting cors to consume from this api
const cors = require("cors")
app.use(cors())

// token
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWTSECRET

// middleware
const auth = require("./middleware/auth")

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
const users = require("./database/users")

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
app.get("/games", auth, async (req, res) => {
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
app.get("/game/:id", auth, async (req, res) => {
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
app.post("/game", auth, (req, res) => {

    var {
        title,
        year,
        price
    } = req.body

    if ((title != undefined) && (year != undefined) && (!isNaN(year)) && (price != undefined) && (!isNaN(price))) {
        games.create({
            title: title,
            year: year,
            price: price
        }).then(() => {
            res.sendStatus(200)
        })
    } else {
        res.sendStatus(400)
    }
})
// create a game - end

// delete a game - begin
app.delete("/game/:id", auth, async (req, res) => {
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
app.put("/game/:id", auth, async (req, res) => {

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
                var {
                    title,
                    year,
                    price
                } = req.body

                if ((title != undefined) && (year != undefined) && (!isNaN(year)) && (price != undefined) && (!isNaN(price))) {
                    // title year price
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
                } else if ((title != undefined) && (year != undefined) && (!isNaN(year)) && (price == undefined)) {
                    // title year
                    await games.update({
                        title: title,
                        year: year
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })

                } else if ((title != undefined) && (year == undefined) && (price != undefined) && (!isNaN(price))) {
                    // title price
                    await games.update({
                        title: title,
                        price: price
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })

                } else if ((title == undefined) && (year != undefined) && (!isNaN(year)) && (price != undefined) && (!isNaN(price))) {
                    // year price
                    await games.update({
                        year: year,
                        price: price
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })
                } else if ((title != undefined) && (year == undefined) && (price == undefined)) {
                    // title
                    await games.update({
                        title: title
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })

                } else if ((title == undefined) && (year != undefined) && (!isNaN(year)) && (price == undefined)) {
                    // year
                    await games.update({
                        year: year
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })

                } else if ((title == undefined) && (year == undefined) && (price != undefined) && (!isNaN(price))) {
                    // price
                    await games.update({
                        price: price
                    }, {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.sendStatus(200)
                    })
                } else {
                    res.sendStatus(400)
                }
            } else {
                res.sendStatus(404)
            }
        })
    }
})
// update a game - begin

// route to authentication - begin
app.post("/auth", (req, res) => {
    var {
        email,
        password
    } = req.body
    if (email != undefined) {
        users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user != undefined) {
                if (user.password == password) {
                    jwt.sign({
                        id: user.id,
                        username: user.username
                    }, jwtSecret, {
                        expiresIn: "48h"
                    }, (err, token) => {
                        if (err) {
                            res.status(400)
                            res.json({
                                err: "Falha interna"
                            })
                        } else {
                            res.status(200)
                            res.json({
                                token: token
                            })
                        }
                    })
                } else {
                    res.status(400)
                    res.json({
                        err: "Combinação de email e senha inválida"
                    })
                }
            } else {
                res.status(404)
                res.json({
                    err: "Usuário não encontrado"
                })
            }
        })
    } else {
        res.status(400)
        res.json({
            err: "E-mail inválido"
        })
    }
})
// route to authentication - end

// route to signup - begin
app.post("/signup", (req, res) => {
    var {
        email,
        password,
        username
    } = req.body
    if ((email != undefined) && (username != undefined) && (password != undefined)) {
        users.create({
            email: email,
            password: password,
            username: username
        }).then(() => {
            res.sendStatus(200)
        })
    } else {
        res.status(400)
        res.json({
            err: "Credenciais inválidas"
        })
    }
})
// route to signup - end

app.listen(process.env.PORT || 45789, () => {
    console.log("API RODANDO")
})