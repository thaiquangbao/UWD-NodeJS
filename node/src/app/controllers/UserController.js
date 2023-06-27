class UserController{
    show(req,res){
        res.send('Welcome to User')
    }
}
module.exports = new UserController();