const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')


//settings
app.set('PORT', process.env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
require('./routes/userRoutes')(app);

//static files
app.listen(app.get('PORT'), () => {
    console.log('server on port 3000');
});