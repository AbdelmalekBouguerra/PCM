const express = require('express')
const path = require('path')
const db = require('./env/db')
const hbs = require('hbs')


const app = express();


// express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// Parse URL encoded bodies sent by forms
app.use(express.urlencoded({ extended:false}))
// Parse JSON bodies as sent by API clients
app.use(express.json())


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
