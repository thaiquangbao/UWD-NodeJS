const Users = require('../models/users')
const bcrypt = require('bcryptjs')
class UserController{
    show(req,res){
        res.send('Welcome to User')
    }
    getUser(req,res,next){
        Users.findById(req._id)
        .then(user =>{
            
            const {password, ...currentUser} =user
            res.json({code:200,currentUser})
            
        })
        
        .catch(error =>{
            res.json({code : 404, message : 'Not Found'})
        })
    }
    updateAvartar(req,res){
        Users.updateOne({_id: req._id},{URL_Avatar: req.file.path})
        .then(user => {
            res.json({code : 200 ,message: 'success'})
        })
        .catch(error =>{
            res.json({code : 500 , message: 'fail'})
        })
    }
    deleteAvartar(req,res){
        Users.updateOne({_id : req._id},{URL_Avatar: ""})
        .then(res.json({code : 200 ,message: 'success'}))
        .catch(res.json({code : 500 , message: 'fail'}))
    }
    updateEmail(req,res){
        Users.updateOne({_id: req._id},{email : req.body.email})
        .then(user => {
            res.json({code :200 , message :'success'})
        })
        .catch(err => {
            res.json({code : 500 , message: 'fail'})
        })
    }
    updateProfile(req,res){
        Users.updateOne({_id: req._id},{name : req.body.name,dateOfBirth :req.body.dateOfBirth, location: req.body.location, bio : req.body.bio})
        .then(user => {
            res.json({code :200 , message :'success'})
        })
        .catch(err => {
            res.json({code : 500 , message: 'fail'})
        })
    }
    updatePassword(req,res){
        Users.findById(req._id)
        .then(async user => {
            const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
            if(!validPassword){
                res.json({code : 401, message : 'fail'})
            }else{
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashed = await bcrypt.hash(req.body.newPassword, salt)
                    await Users.updateOne({_id: req._id},{password:hashed})
                    res.json({code : 200, message : 'success'})
                } catch (error) {
                    res.json({code : 500, message : 'fail'})
                }
            }
        })
        .catch(err => {
            res.json({code : 500, message : 'fail'})
        })
    }
    deleteUser(req,res){
        Users.deleteOne({_id:req._id})
        .then(res.json({code : 200, message : 'success'}))
        .catch(res.json({code : 500, message : 'fail'}))
    }

}
module.exports = new UserController();