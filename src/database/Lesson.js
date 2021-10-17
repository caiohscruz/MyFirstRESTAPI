const Sequelize = require("sequelize")
const connection = require("./database")
const Course = require("./database/Course")

/* Cria a estrutura da tabela. STRING < TEXT */
const Lesson = connection.define("Lessons", {
    title: {
        type: Sequelize.STRING,
        allownull: false
    },
    link: {
        type: Sequelize.STRING,
        allownull: false
    },
    description: {
        type: Sequelize.TEXT,
        allownull: false
    }
})

// Estabelendo relacionamento 1-n
Course.hasMany(Lesson)
// Estabelecendo relacionamento 1-1
Lesson.belongsTo(Course)
// inicializa tabelas caso não existam
User.sync({
    force: false
})

module.exports = Lesson