const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.serializeUser((user, done)=> {
    console.log("serializing user")
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log("deserializing user")
    console.log(id);
    try {
        const user = await User.findById(id);
        if(!user) throw new Error('user not found')
        done(null, user)
    } catch(err) {
        console.log(err)
        done(err, null)
    }
})

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

/* 
Serialise user in passport is used to save some information with the user.
Deserialise user is used to retrieve the informations from  the user.
*/