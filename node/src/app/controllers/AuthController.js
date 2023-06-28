
const Auth = require('../models/users')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
class AuthController{
    show(req,res){
        res.send('Welcome To Auth')
    }
    signup(req,res,next){
        Auth.find({})
        .then(auth => {
            res.json(auth)
        })
        .catch(next)
    }
    login(req,res,next){
        Auth.findOne({username: req.body.username})
        .then (users => {
            if(!users){
                res.json({code: 404, message : 'Login Failed'})
            }else{
                bcrypt.compare(req.body.password, users.password)
                .then(validPassword =>{
                    if(!validPassword)
                    {
                        res.json({code: 404, message : 'Login Failed'})
                    }
                    else{
                        const token = jwt.sign({
                            id : users.id,
                            admin : users.admin
                        },process.env.MY_SERECT_KEY,
                        { expiresIn: '1d' })
                        res.status(200).json({token:token})
                    }
                    
                })
                .catch(err =>{
                    res.json({code: 404, message : 'Login Failed'})
                })
            }

       
        })
        .catch (error => {
            res.json({code: 404, message : 'Login Failed'})
        })
      
    }
}
module.exports = new AuthController();