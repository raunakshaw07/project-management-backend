const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../model/UserModel');

const initializePassport = (passport) => {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email })
        if (user == null) {
            return done(null, false, { msg: "User doesn't exist. Please create an account." })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { msg : "Password Incorrect" });
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))
    
    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, (err, user) => {
            done(err, user)
        })
    });
}

module.exports = initializePassport;