// Permite interagir com diferentes bancos de dados
const Sequelize = require("sequelize")

// Setando variáveis de ambiente com dotenv
require('dotenv/config');

// passando string de conexao
const connection = new Sequelize(process.env.JAWSDB_URL)

module.exports = connection