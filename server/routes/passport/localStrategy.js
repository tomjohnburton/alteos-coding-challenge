const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");
const bcrypt = require("bcrypt");

//! Here I define the strategy used by passport in order to login my user. It will be a middleware for the login
//! POST request

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(foundUser => {
          if (!foundUser) {
            done(null, false, { message: "Incorrect email/password" });
            return;
          }

          if (!bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, { message: "Incorrect email/password" });
            return;
          }

          return done(null, foundUser);
        })
        .catch(err => done(err));
    }
  )
);
