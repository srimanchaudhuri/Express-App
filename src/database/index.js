const mongoose = require('mongoose');

//mongoose.connect('mongodb://username:password@localhost:27017/expressjs-tutorial')
//localhost is the host name -> this is actual way to access the database : 27017 is jst the default host

mongoose.connect('mongodb://localhost:27017/expressjs-tutorial')
.then(() => console.log("Connected to DB"))
.catch((err) => console.log(err))