const Sequelize = require('sequelize')



module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },

    })
    return User
}
