const JwtStategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const db = require('../database')
const {raw} = require("express");

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStategy(option, async (payload, done) => {
            try{
                const user = await db.User.findByPk(payload.userId)
                if(user){
                    done(null, user)

                }else{
                    done(null, false)
                }
            }catch (e){
                console.log(e)
            }
        })
    )
}