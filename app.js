const express = require('express')
var http = require('http');
const https = require('https');
const path = require('path')
const db = require('./env/db')
const hbs = require('hbs')
const session = require('express-session');

const fs = require('fs');

const key = fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./cert/CA/localhost/localhost.crt');


const app = express();
var credentials = {key: key, cert: cert};

// express server
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
const http_port = 3000;
const https_port = 3030;

httpServer.listen(http_port, () => {
    console.log(`Server started on http://localhost:${http_port}`);
});
httpsServer.listen(https_port, () => {
    console.log(`Server started on https://localhost:${https_port}`);
});


// Parse URL encoded bodies sent by forms
app.use(express.urlencoded({ extended:false}))
// Parse JSON bodies as sent by API clients
app.use(express.json())

// Session
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}))
// Routers
const indexRouter = require('./routes/index');
const prestationRouter = require('./routes/prestation');

app.use('/',indexRouter);
app.use('/prestation',prestationRouter);

// db MySQL
db.connect((err) => {
    if (err) {
        console.log("error db connction" + err);
    } else {
        console.log("MySQL connected ...");
    }
})

// define public directory
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

// Define view engine
app.set('view engine', 'hbs');

// template hbs
hbs.registerPartials(path.join(__dirname, 'views', 'templates'))

module.exports = app;