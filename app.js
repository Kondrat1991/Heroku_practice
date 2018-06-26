const express = require('express');
const app = express();
const productRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const usersRouter = require('./api/routes/users');
const checkAuth = require('./api/middleWares/middleWares');

// let passport = require('passport');
// let LocalStrategy = require('passport-local').Strategy;

// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/static/index.html');
});
app.use('/products', checkAuth, productRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);


module.exports = app;



