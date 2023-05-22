const Database = require('./database')
require('dotenv').config()
const app = require('./apps')
const PORT = process.env.PORT || 7000

async function startAp(){
    try {
        await Database.sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    }catch (e){
        console.log(e)
    }
}

startAp()