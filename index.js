const express = require('express')
const app = express()
const port = 8000;
const morgan = require('morgan')
const cors = require('cors')

app.use(cors([{
    origin: "http://localhost:3000"
}]))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({
    extended : true,
}))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })