const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');

  let userFacebook = () => {
      passport.use(new FacebookStrategy({
              clientID: 1993107304353343,
              clientSecret: '4ca499c5cac0921d44b08b288685c118',
              callbackURL: "http://secret-falls-75483.herokuapp.com/users/login/facebook/callback"
          },
          (req, accessToken, refreshToken, profile, done) => {
              console.log('check profile', profile);
              let data = profile._json;
              User.findOne({email: data.email})
                  .exec()
                  .then(user => {
                      if (!user) {
                          const user = new User({
                              email: data.email,
                          })
                      }
                  })
                  .catch(err => {
                      res.status(500).json(err);
                  })
          }
      ));
  };

  module.exports = userFacebook;





