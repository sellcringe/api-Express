const db = require('../database')
require('dotenv').config()
const {Op} = require('sequelize')
const fs = require('fs')
const PORT = process.env.PORT
const HOST = process.env.HOST

async function getAll(req, res){
    const {page, size} = req.query
    const getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    }
    const {limit, offset} = getPagination(page, size)

    const posts = await db.Post.findAll(
        {limit: limit,
                offset: offset})


    res.status(200).json(posts)
}
async function create(req, res){
    const post = await db.Post.create({
        content: req.body.content,
        file_url: req.file ?  `localhost:${PORT}/` + req.file.path.replace("\\",'/') : '',
        userId: req.user.id})
    res.status(201).end()
    return post






}
async function update(req, res){
    try{
        const post = await db.Post.findOne({where:{
            id: req.params.id
            }})
        if(post.userId == req.user.id){
            if(!post.file_url == '') {

                const fileName = post.file_url.replace(`${HOST}:${PORT}`, '')
                try {
                    fs.unlink(`.${fileName}`, () => {})
                }catch (e){
                    console.log(e)
                }

            }

            const postUpdate = await db.Post.update({
                content: req.body.content,
                file_url: req.file ? `${HOST}:${PORT}/` + req.file.path.replace("\\", '/') : ''
            }, {
                where: {
                    userId: req.user.id,
                    id: req.params.id
                }

            })
            res.status(200).json(post)
            return postUpdate
        }else{
            res.status(409).json({
                message: 'нет доступа к этому посту'
            })
        }

    }catch (e){
        res.status(404).json({
            message: 'NOT FOUND'
        })
    }

}
async function deletePost(req, res){
    try{
        const post = await db.Post.findOne({
            where: {
                id: req.params.id
            }
        })
        if(post.userId == req.user.id){

            if(!post.file_url == '') {

                const fileName = post.file_url.replace(`${HOST}:${PORT}`, '')
                try {
                    fs.unlink(`.${fileName}`, () => {})
                }catch (e){
                    console.log(e)
                }

            }

            await db.Post.destroy({
                where: {
                    userId:  req.user.id ,
                    id: req.params.id
                }
            })

            res.status(200).end()
        }else{
            res.status(409).json({
                message: 'нет доступа к этому посту'
            })
        }


    }catch (e){
        res.status(404).json({
            message: "NOT FOUND"
        })
    }

}
module.exports = {
    create,
    getAll,
    update,
    deletePost
}