const {Router} = require('express')

const router = Router()

//This will now check for a user is present then we can enter this app or we will get 401 - unauthorized
//Now this route is protected
router.use((req, res, next) => {
    if(req.session.user) next();
    else {
        res.send(401)
    }
})

const supermarkets = [
    {
        id: 1,
        store: 'Whole Foods',
        miles: 0.6,
    },
    {
        id: 2,
        store: 'Trader Joes',
        miles: 2.5,
    },
    {
        id: 3,
        store: 'Albertsons',
        miles: 3.6,
    },
];

router.get('/', (req, res) => {
    console.log(req.query)
    // Destucturing the miles from the query parameter
    const { miles } = req.query
    const parsedMiles = parseInt(miles)

    //Displaying only the stores within 3 miles
    if(!isNaN(parsedMiles)) {
        const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles)
        res.send(filteredStores)
    }
    else
    res.send(supermarkets)
})

module.exports = router;