const express=require('express')
const app=express()
const port=4000
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/passport')
const UserModel=require('./config/model')
const bcrypt =require('bcrypt')
const session=require('express-session')
const Mongostore=require('connect-mongo')
var passport=require('passport')
require('./config/passport')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:Mongostore.create({mongoUrl:"mongodb://localhost:27017/passport-google",collectionName:"sessions"}),
    cookie: { 
        maxAge:1000*60*60*24 }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
   
app.get('/login',(req,res)=>{
      res.render("login")
})  
 app.get('/auth/google',passport.authenticate('google',{scope:['profile']}))
app.get('/auth/callback',passport.authenticate('google',{failureRedirect:'/login',successRedirect:"/protected"})),
app.get('/protected',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('protected',{
            name:req.user.name
        })
    }
        else
        {
          res.send('unauthorised').status(401)
        }
        console.log(req.session)
        console.log(req.user)
    })                                   
app.listen(port,()=>{
    console.log('server is running on'+port)
})