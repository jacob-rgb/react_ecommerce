const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();


// initializations

const app = express();


// settings
app.set('port', process.env.PORT || 4100);

// Middlewares

app.use(morgan('dev'));

app.use(cors());

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(express.static(__dirname + '/public'));

// Global Variables

app.use((req, res, next) => {
    
    next();
});


// Routes

app.use(require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/productos'));
app.use('/compras', require('./routes/compras'));
app.use('*', express.static(__dirname + '/public'));


// Public

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
