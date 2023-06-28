const Users = require('../models/users')
const jwt = require('jsonwebtoken')

class MiddleWareController{
    verifyToken (req,res,next){
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.MY_SERECT_KEY, (err, user) => {
                if (err) {
                    res.json({code : 403, message : "Token is not valid"})
                } else {
                    req._id =  user.id
                    next()
                }
            })
        } else {
            res.json({code : 401, message : "You 're not authentication"})
        }
    }
}

module.exports = new MiddleWareController()