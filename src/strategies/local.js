const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.use(
    new Strategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        console.log(email)
        console.log(password)
        if(!email || !password) {
            done(new Error('Bad Request'), null)
        }
        try{
            const userDB = await User.findOne({email})
            if(!userDB) {
                throw new Error('No user found')
            }
            const isValid = comparePassword(password, userDB.password)
            if(isValid) {
                console.log(`Authentication succesful`)
                done(null, userDB)
            }else {
                console.log(`Authentication unsuccesful`)
                done(null, null)
            }
        } catch (err ){
            done(err, null)
        }
    })
)