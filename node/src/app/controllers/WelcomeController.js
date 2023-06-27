class WelcomeController{
    show(req,res){
        res.send('Welcome to UWD-NodeJS')
    }
}
module.exports = new WelcomeController();