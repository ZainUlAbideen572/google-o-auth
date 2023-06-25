const mongoose=require('mongoose')
const schema=mongoose.Schema({
    Username:String,
    Password:String
})
const model=mongoose.model('Users',schema)
module.exports=model;