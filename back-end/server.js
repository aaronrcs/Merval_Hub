const
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path')

const
    app = express(),
    app2 = express(),
    server = require('http').Server(app2)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', '/front-end')))

app.use(require('./api/routes')())
app.listen(8080, () => {
    console.log('Server is running')
})

app2.use(express.static(path.join(__dirname, '..', '/front-end')))
require('./sockets')(server)
server.listen(8082)