const Sequelize = require("sequelize");
require('dotenv').config()

const database = {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
}

const sequelize = new Sequelize(database)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./models/user')(sequelize, Sequelize)
db.Post = require('./models/post')(sequelize, Sequelize)

db.User.hasMany(db.Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.Post.belongsTo(db.User)


module.exports = db