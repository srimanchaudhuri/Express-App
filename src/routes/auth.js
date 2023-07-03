const {Router} = require('express')
const passport = require('passport')
const User = require('../database/schemas/User')
const {hashPassword, comparePassword} = require('../utils/helpers')
const router = Router()


// This is an example login route
// The user will post there username and password in this route in request.body for authentication

// router.post('/login', (req, res) => {
//     const {username, password} = req.body;
//     if(username && password) {
//         if(req.session.user) {
//             //If username is found we send that user is already logged in
//             res.send(req.session.user)
//             res.send('You are already logged in')
//         } else {
//             // If user not found we create a user object in session and attach the username in it
//             req.session.user = {
//                 username,
//             }
//             res.send(req.session);
//         }
//     }
//     else {
//         res.send(401);
//     }
//     })

// Authentication Without Passport

// router.post('/login', async (req, res) => {
//     const {email, password} = req.body;
//     if(!email || !password) return res.send(400)
//     const userDB = await User.findOne({email})
//     if(!userDB) return res.send(401)
//     const isValid = comparePassword(password, userDB.password)
//     if(isValid) {
//         req.session.user = userDB;
//         return res.send(200)
//     } else {
//         return res.send(401)
//     }
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged in')
    res.send(200)
})

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const userDB = await User.findOne({email}); 
    if (userDB) {
        res.status(400).send({ msg: 'User Already Exists.'})
    } else {
        const password = hashPassword(req.body.password);
        const newUser = await User.create({email, password})
        newUser.save()
        res.send(201)
    }
})

module.exports = router;
