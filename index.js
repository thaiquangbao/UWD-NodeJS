const express = require('express')
const app = express()
const port = 8000;
const morgan = require('morgan')
const cors = require('cors')
const route = require("./node/src/routes")
const db = require('./node/src/config/db')
const dotenv = require('dotenv')
app.use(cors([{
    origin: "http://localhost:3000"
}]))
app.use('/uploads', express.static('uploads'));
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({
    extended : true,
}))
dotenv.config()

route(app)
db.connect()
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })