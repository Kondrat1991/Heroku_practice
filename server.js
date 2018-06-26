const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const db = require('./config/db');
mongoose.connect(db.dbURL);

http.createServer(app).listen(PORT,console.log("Server started successfully at port " + PORT));







