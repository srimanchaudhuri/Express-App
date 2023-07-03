const {Router} = require('express');

const router = Router();

//This will now check for a user is present then we can enter this app or we will get 401 - unauthorized
//Noe this route is protected
router.use((req, res, next) => {
    if(req.session.user) next();
    else {
        res.send(401)
    }
})

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

// register a middleware for router
router.get(`/`, (req, res) => {
    // This is how to send a cookie to the user and any other time the user visits the website it will show up and give some info
    res.cookie('visited', true, {
        maxAge: 10000,
    })
    res.send(groceryList)
})

router.get('/:item', (req, res) => {
    //To get the cookies from the user we first need to parse it
    console.log(req.cookies)
    console.log(req.params)
    const { item } = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    res.send(groceryItem)
})


router.post(`/`, (req, res) => {
    console.log(req.body)
    groceryList.push(req.body)
    res.send(201)
})

router.get('/shopping/cart', (req, res) => {
    const {cart} = req.session;
    if(!cart){
        res.send("You have no cart session")
    } else {
        res.send(cart);
    }
})

router.post('/shopping/cart/item', (req, res) => {
    const {item, quantity} = req.body;
    const cartItem = {item, quantity};
    const {cart} = req.session;
    // This will send a session ID corresponding to the req made
    // -> res.send(req.sessionID)
    if(cart) {
        req.session.cart.items.push(cartItem)
        // request->session(sessions like cart, shopping etc.)->cart(cart session)->
        // items(info in this data structure is saved during the session its like an info container)->
        // push(info u want to save)
    } else {
        req.session.cart = {
            items: [cartItem],
        };
    }
    //This process above will send a cookie to the client whenever we modify the session
    //This will save our session info as a parsable cookie in the server site
    res.send(201);
})

module.exports = router;