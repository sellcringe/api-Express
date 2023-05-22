const express = require('express')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const passport = require('passport')
const bodyParser = require('body-parser')

const app = express()

const swaggerOption = require('./config/swaggerOptions')

const routes = {
    post: require('./routes/post'),
    auth: require('./routes/auth')
}
const specs = swaggerJsdoc(swaggerOption);
console.log(specs)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/upload', express.static('upload'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/api/auth', routes.auth)
app.use('/api/post', routes.post)


module.exports = app