const express = require('express')
var http = require('http');
const https = require('https');
const path = require('path')
const db = require('./env/db')
const hbs = require('hbs')
const session = require('cookie-session');
const chalk = require('chalk');
const compression = require('compression');


// chalk styling 
const error = chalk.bold.redBright.inverse;
const success = chalk.bold.greenBright;
const warning = chalk.keyword('orange').bold;


const fs = require('fs');

const key = fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./cert/CA/localhost/localhost.crt');


const app = express();
app.use(compression());
var credentials = {key: key, cert: cert};

// express server
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
const http_port = 3000;
const https_port = 3031;

// httpServer.listen(http_port, () => {
//     console.log(success('Server started on http://localhost:'+http_port));
// });
httpsServer.listen(https_port, () => {

    console.log(success('Server started :'),'https://localhost:'+https_port);
});


// Parse URL encoded bodies sent by forms
app.use(express.urlencoded({ extended:false}))
// Parse JSON bodies as sent by API clients
app.use(express.json())

// Session
app.use(session({
    name:'session',
    secret:'key1',
    key: ['key1','key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours

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
        console.log(success("MySQL connected"));
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