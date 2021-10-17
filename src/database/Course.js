const Sequelize = require("sequelize")
const connection = require("./database")

/* Cria a estrutura da tabela. STRING < TEXT */
const Course = connection.define("Courses", {
    title: {
        type: Sequelize.STRING,
        allownull: false
    },
    cover: {
        type: Sequelize.STRING,
        allownull: false
    },
    teacher: {
        type: Sequelize.STRING,
        allownull: false
    },
    description: {
        type: Sequelize.TEXT,
        allownull: false
    }
})

// inicializa tabelas caso não existam
Course.sync({
    force: false
})

module.exports = Course