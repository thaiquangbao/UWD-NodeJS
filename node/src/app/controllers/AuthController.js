class AuthController{
    show(req,res){
        res.send('Welcome To Auth')
    }
}
module.exports = new AuthController();