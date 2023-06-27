const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const users= new Schema({
    username : {
        type : String,
        unique : true,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    name : {
        type : String,
        require : true
    },
    dateOfBirth : {
        type : Date,
        require : true
    },
    admin : {
        type : Boolean,
        default : false
    },
    bio : {
        type : String,
        require : true,
        default : ''
    },
    location : {
        type : String,
        require : true,
        default : 'Viet Nam'
    },
    URL_Avatar : {
        type : String,
        require : true,
        default : ''
    }
}, {timestamps : true})

module.exports = mongoose.model('Users',users)