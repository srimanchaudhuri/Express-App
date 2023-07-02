const {Router} = require('express')

const router = Router()

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