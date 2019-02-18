const passport = require('passport');
const GpoogleStrategy = require('passport-google-oauth20');

const keys = require('../config/keys');

passport.use(
    new GpoogleStrategy({
        // option for the google strategy
        callbackURL: '',
        clienID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }), () => {
        // passport callback function

    }
)