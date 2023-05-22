const Sequelize = require("sequelize");
require('dotenv').config()

const database = {
    dialect: 'postgres',
    client: 'pg',
    url: process.env.DATABASE_URL,
    protocol: 'postgres',
    // host: process.env.POSTGRES_HOST,
    // port: 5432,
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DB,


    ssl: true,
    native: true


}

// const knex = require('knex');
// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString: 'postgres://apihhru_user:QCb3OXlaXyrRhzNygiMhOauWS5kT7d96@dpg-chlmre64dadfmsgj44mg-a/apihhru',
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// });

// module.exports = db;

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