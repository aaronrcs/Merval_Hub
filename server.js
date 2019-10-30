const
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    cors = require('cors')
let portSocket = 8082;

const
    app = express(),
    app2 = express()
    // server = require('http').Server(app2)
    server = app2.listen(portSocket);

// app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next()
})

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '.', '/front-end')))

app.use(require('./api/routes')())

// Code for production
if(process.env.NODE_ENV === 'production'){
    // Set static path
    app.use(express.static(__dirname + '/dist/'))

    // redirecting to index.html to display our project
    app.get(/.*/,(req,res) => res.sendFile(__dirname + '/dist/index.html'))
}
// For tesing locally
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running');
})

// For production
// app.listen(process.env.PORT);

app2.use(express.static(path.join(__dirname, '.', '/front-end')))
require('./sockets')(server)
// server.listen(8082)