const {Sequelize} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        content:{
            type: Sequelize.STRING,
            // allowNull: false
        },
        file_url: {
            type: Sequelize.STRING
        }


    })
    return Post
}