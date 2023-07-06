
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./strategies/local');

//Routes
const groceriesRoute = require('./routes/groceries');
const marketRoute = require('./routes/markets');
const authRoute = require('./routes/auth')

require('./database')

const app = express();
const PORT = 3002;
const memoryStore = new session.MemoryStore()

//ALL MIDDLEWARES ARE EXECUTED TOP TO BOTTOM IN ORDER
//used to assign a middleware funtion between two main functionalities
//is used to accept if any json element is posted to the server
app.use(express.json())
app.use(express.urlencoded())

app.use(cookieParser())
app.use(
    session(
        {
            secret: `AHUSHINCEOAMKLSNJKACSICSAJNCKJ`,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: 'mongodb://localhost:27017/expressjs-tutorial',
            }),
        }
        )
        );
        
        //We can create a function(middleware) and apply it globally like this...
        app.use((req, res, next) => {
            //This logs a message for every single route (get, post etc.)
            console.log(`${req.method} ${req.url}`)
            next()
        })

        app.use((req, res, next) => {
            console.log(memoryStore)
            next()
        })

app.use(passport.initialize());
app.use(passport.session());
        
    // we can now prefix it with /api. Therefore localhost:3000/groceries -> localhost:3000/api/groceries
    app.use('/api/v1/groceries',groceriesRoute);
    app.use('/api/v1/markets',marketRoute);
    app.use('/api/v1/auth' ,authRoute);

//MIDDLEWARE is a function called during life cycle of request
/*
Technicaly every function passed as second parameter is a middleware to
eg. app.get(`/groceries`, (req, res, next) => { THIS IS ALSO A MIDDLEWARE FUNCTION }
next -> allows us to invoke the next `middleware` (function)
Every middleware has access to 3 params : req, res & next
*/

app.listen(PORT, () => console.log(`running express server on port ${PORT}`));



/* -------------------------THEORY--------------------------

const groceryList = [
    {
        item: 'milk',
        quantity: 2
    },
    {
        item: 'cereal',
        quantity: 4
    },
    {
        item: 'apple',
        quantity: 16
    }
]

// app.get is used to get data from server
// get route
app.get(`/groceries`, 
(req, res, next) => {
    console.log("BEFORE HANDLING REQUEST")
    // This function is invoked but the next function is not.
    // so we have to call next  like below
    next()
}, 
(req, res, next) => {
    //sends the data in grocery list array from server to client: over here our window
    res.send(groceryList)
    next()
},
() => {
    //This the third middleware in the chain of middlewares
    console.log('Finished executing get request')
}
)
//:item will take in any value which is passed
app.get('/groceries/:item', (req, res) => {
    console.log(req.params)
    const { item } = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    res.send(groceryItem)
})

//Setting up a Router in express (Allows us to create reusable files)

// app.post is used to post data into server
// post route
app.post(`/groceries`, (req, res) => {
    console.log(req.body)
    // In the below line when ever any data is posted in the server we will push that data into the grocery list array
    groceryList.push(req.body)
    // whenever a post takes place sends `201` -> "created" as response
    res.send(201)
})

// Setting another sub-route with route-parameter
// Eg. GET http://localhost:3001/books/(4245666783)->This is the Route parameter. It is actually the book id.


COOKIES

http is stateless eg. grocereies and market api call has no corelation at all unless you have cookies.
SO whenever you send a get request to a web server it will send you back a cookie. That cookie will be stored on the client.
This cookie is again sent to the server which contains some info eg. wether the user has visited this server before etc. when user again visits the website
This is very important in websites like amazon to maintain the users shopping cart

SESSIONS

Using Sessions we can save all the informations in the server site.
Unlike cookies where we save the info in the client site where it is more prone to attacks and info leaks.

*/