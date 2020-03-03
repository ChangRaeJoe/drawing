var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const login = require('./signin')

module.exports = {
    passport:passport,
    initLocal: function() {

        passport.use(new LocalStrategy(login.getLogin));
        
        passport.serializeUser(function(user, done) {
            console.log('serial')
            const userOne = {
                'id': user['id'],
                'nick': user['nick']
            }
            done(null, userOne);
        });
        
        passport.deserializeUser(function(userSimple, done) {
            console.log('deserial::', userSimple)
            done(null, userSimple)
        });
    }
}