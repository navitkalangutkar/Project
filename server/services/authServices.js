const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models').users;
const constants = require('../utils/constants');

const localOpts = {
    usernameField: 'userName',
};

const localLogin = new LocalStrategy(localOpts, async (userName, password, done) => {
    try {
        const User = await user.findOne({ where: { userName: userName } });

        if (!User) {
            return done(null, false);
        } else if (!User.authenticationUser(password)) {
            return done(null, false);
        }
        return done(null, User);
    } catch (error) {
        return done(error, false);
    }
});

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
        const User = await user.findByPk(payload.id);
        if (!User) {
            return done(null, false);
        }
        return done(null, User);
    } catch (error) {
        return done(error, false);
    }
});

passport.use(localLogin);
passport.use(jwtLogin);

const authLocal = passport.authenticate('local', { session: false });
const authJwt = passport.authenticate('jwt', { session: false });

module.exports = {
    authLocal,
    authJwt
}