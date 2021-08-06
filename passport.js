const Local = require("passport-local").Strategy
const FaceBook = require("passport-facebook").Strategy
const mongoose = require('mongoose')
const UserModel = require("./Models/UserModel")
const FaceBook_Client_ID = "1239285339850085"
const FaceBook_Client_Secret = "09e8db710c5ae3acaea16561e1462e59"
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = ""
const GOOGLE_CLIENT_SECRET = ""

function initial(passport){
    passport.use(new Local({usernameField: "email"}, (email, password, done) => {
        UserModel.findOne({Email: email}).then(user => {
            if(!user){
                return done(null, false)
            }

            if(password !== user.password){
                return done(null, false)
            }

            return done(null, user)
        })
    }))


    passport.use(new FaceBook({
        clientID: FaceBook_Client_ID,
        clientSecret: FaceBook_Client_Secret,
        callbackURL: "http://localhost:3001/fbcomplete"
    },
    (accessToken, refreshToken, profile, cb) => {
        // console.log(profile);
        UserModel.findOne({ facebookId: profile.id }, (err, user) => {
            // console.log(user);
            if(user === null){
                const register = new UserModel({
                    username: profile.displayName,
                    facebookId: profile.id,
                    firstname: null
                })
            }
            return cb(err, user)
        })
    }))
    // passport.use(new GoogleStrategy({
    //     clientID:     GOOGLE_CLIENT_ID,
    //     clientSecret: GOOGLE_CLIENT_SECRET,
    //     callbackURL: "http://yourdomain:3000/auth/google/callback",
    //     passReqToCallback   : true
    //   },
    //   function(request, accessToken, refreshToken, profile, done) {
    //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //       return done(err, user);
    //     });
    //   }
    // ));

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, (err, user) => {
            done(err, user)
        })
    })

    

}

module.exports =  initial