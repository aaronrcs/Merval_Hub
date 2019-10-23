const
    bodyParser = require('body-parser'),
    // express = require('express'),
    path = require('path')

// const
//     app = express(),
//     app2 = express(),
//     server = require('http').Server(app2)
//     io = require('socket.io')(server)

const express = require('express'),
    http = require('http');
    app = express();
    app2 = express();
    server = http.createServer(app2);
    io = require('socket.io').listen(server);

server.listen(8082);



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

    io.connect('http://localhost:8082');

    const prevQueries = []

    io.on('connection', socket => {

        // Syncing the queries list in the root
        socket.emit('refreshQueries', prevQueries)

        // Adding the new queries to the list
        socket.on('addQuery', data => {
            prevQueries.push(data)
            io.emit('successfulQuery', data)
        })
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
// For testing locally
// app.listen(8080, () => {
//     console.log('Server is running')
// })
// For production
app.listen(process.env.PORT);

app2.use(express.static(path.join(__dirname, '.', '/front-end')))
// require('./sockets')(server)
// server.listen(8082)