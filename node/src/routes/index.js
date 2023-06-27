 const  authRoute = require('./auth')
const  userRoute = require('./user')
const welcomeRoute = require('./welcome')
function route(app) {
    app.use('/user',userRoute)
    app.use('/auth',authRoute)
    app.use('/',welcomeRoute);
}
module.exports = route;