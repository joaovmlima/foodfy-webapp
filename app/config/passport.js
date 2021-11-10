const db = require('./db')

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });

    passport.use(new LocalStrategy(
    function(username, password, done) {
        db.query(
        `SELECT *
              FROM users
              WHERE users.username = ($1)`,
            [username], function (err, user) {
            if (err) { return done(err); }
            if (user.rows[0] === undefined) {
             return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.rows[0].password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
              }
        return done(null, user.rows[0]);
        });
    }
    ));
}