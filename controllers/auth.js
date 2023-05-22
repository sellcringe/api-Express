const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')
const keys = require('../config/keys')
async function login(req, res){
    const candidate = await db.User.findOne({where: {email: req.body.email}})
    if(candidate){
        const passwordResult = await bcrypt.compare(req.body.password, candidate.password)
        if(passwordResult){
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: 'Пароли не совпадают'
            })
        }

    }else{
        res.status(404).json({
            message: 'Такого пользователя не существует'
        })
    }

}

async function register(req, res){
    const candidate = await db.User.findOne({where: {
        email: req.body.email
        }})
    if(candidate){
        res.status(409).json({
            message: 'Такой email уже занят.'
        })
    }else{

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        console.log(password)
        const user = await db.User.create({email: req.body.email, password: password})

        res.status(201).json({
            message: 'Пользователь зарегестрирован'
        })
        return user

    }

}

async function getAll(req, res){
    const users = await db.User.findAll()
    res.status(200).json(users)
}
module.exports = {
    login,
    register,
    getAll
}