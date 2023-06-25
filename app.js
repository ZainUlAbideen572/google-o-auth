const express=require('express')
const app=express()
const port=4000
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/passport')
const morgan=require('morgan')
const UserModel=require('./model')
app.use(bodyparser.json())
app.use(morgan('combined'))
app.set('view engine','ejs')
app.get('/login',(req,res)=>{
    res.render("login")
})
app.get('/register',(req,res)=>{
  
    res.render("register")
})  
app.post('/login',(req,res)=>{
    res.send("get")
})  
app.post('/register',(req,res)=>{
    let Users=new UserModel({
        Username:req.body.Username,
        Password:req.body.Password
    })
    // console.log(Username)
        Users.save()
        .then(Users=>console.log(Users))
        res.status(201)
        res.send('created')
})    
app.get('/logout',(req,res)=>{
    res.send("logout")
})  
app.get('/protected',(req,res)=>{
    res.send('protected')
})                                         
app.listen(port,()=>{
    console.log('server is running on'+port)
})