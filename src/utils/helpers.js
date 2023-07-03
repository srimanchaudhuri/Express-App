const bcrypt = require('bcryptjs')

// How we hash password -> By adding salt.


function hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function comparePassword(raw, hash) {
    return bcrypt.compareSync(raw, hash)
}

module.exports = {
    hashPassword,
    comparePassword,
}