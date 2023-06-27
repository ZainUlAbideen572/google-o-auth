const passport=require('passport')
const UserModel=require('./model')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: "59440701460-ah7vt7t58qdfj20qhbts9ldnsrkv85uf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://localhost:4000/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
        console.log(accessToken,profile)
      UserModel.findOne({googleId:profile.id},(err,user)=>{
            if(err) return cb(err,null);
            if(!user){
              let newUser=new UserModel({
                  googleId:profile.id,
                  name:profile.displayName
              })
              newUser.save()
              return cb(null,newUser)
            }  else{
              return cb(err, user);

            }  
      })
    })
  
);
  passport.serializeUser(function(user, done) {
        done(null,user.id)
  });
  
  passport.deserializeUser(function(id, done) {
    UserModel.findById(id,function(err,user){
        done(err,user)
    })
  });