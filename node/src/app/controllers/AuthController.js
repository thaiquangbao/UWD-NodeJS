
const Auth = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class AuthController{
    show(req,res){
        res.send('Welcome To Auth')
    }
    signup(req,res,next){
        bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(req.body.password, salt);
        })
        .then(hashed => {
            const newUser = new Auth({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth
            });
            return newUser.save();
        })
        .then(user => {
            res.status(200).json({ message: 'success' });
        })
        .catch(error => {
            res.json(error);
        });
       
    }
    login(req,res,next){
        Auth.findOne({ username: req.body.username })
            .then(user => {
                if (!user) {
                    res.json({ code: 404, message: 'Login Failed' });
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(validPassword => {
                            if (!validPassword) {
                                res.json({ code: 404, message: 'Login Failed' });
                            } else {
                                const token = jwt.sign(
                                    {
                                        id: user.id,
                                        admin: user.admin
                                    },
                                    process.env.MY_SERECT_KEY,
                                    { expiresIn: '1d' }
                                );
                                
                                res.status(200).json({ token: token });
                            }
                            
                        })
                        .catch(error => {
                            res.json({ code: 404, message: 'Login Failed' });
                        });
                }
            })
            .catch(error => {
                res.json({ code: 404, message: 'Login Failed' });
            });
    }
    checkUserName(req,res){
        Auth.findOne({username:req.query.username})
        .then(user =>{
            if (user) {
                res.json({exist :false})
            }
            else{
                res.json({exist : true})
            }
        })
        .catch(err => {
            res.json(err)
        })
    }
    checkEmail(req,res){
        Auth.findOne({email : req.query.email})
        .then(user =>{
            if(user){
                res.json({exist :false })
            }
            else{
                res.json({exist :true})
            }
        })
        .catch(err => {
            res.json(err)
        })
    }
    checkToken(req,res){
        const token = req.query.token;
        if (token) {
            jwt.verify(token, process.env.MY_SERECT_KEY)
                .then(user => {
                    res.json({ message: true });
                })
                .catch(err => {
                    res.json({ message: false });
                });
        } else {
            res.json({ message: false });
        }
    }  

}
module.exports = new AuthController();