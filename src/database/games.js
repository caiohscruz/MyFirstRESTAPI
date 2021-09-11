const Sequelize = require("sequelize")
const connection = require("./database")

/* Cria a estrutura da tabela. STRING < TEXT */
const Game = connection.define("games", {
    title: {
        type: Sequelize.STRING,
        allownull: false
    },
    year: {
        type: Sequelize.STRING,
        allownull: false
    },
    price: {
        type: Sequelize.STRING,
        allownull: false
    }
})

// inicializa tabelas caso não existam
Game.sync({
    force: false
})

module.exports = Game