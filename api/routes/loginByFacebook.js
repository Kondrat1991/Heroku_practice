const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('../models/users');
const Social = require('../models/socialUser');

// https://secret-falls-75483.herokuapp.com/people/auth/facebook/callback

  let userFacebook = () => {
      passport.use(new FacebookStrategy({
              clientID: 1993107304353343,
              clientSecret: '4ca499c5cac0921d44b08b288685c118',
              callbackURL: "https://mighty-escarpment-23018.herokuapp.com/users/login/facebook/callback"
          },
          (req, accessToken, refreshToken, profile, done) => {
              console.log('check profile', profile);
              let data = profile._json;
              Social.findOne({id: data.id})
                  .exec()
                  .then(user => {
                      if (!user) {
                          const newUser = new Social({
                              id: data.id,
                              displayName: data.displayName,
                              provider: data.provider
                          });
                          newUser.save();
                          done(null, newUser);
                      }

                  })
                  .catch(err => {
                      console.log(err);
                  })
          }
      ));
  };

  module.exports = userFacebook;





