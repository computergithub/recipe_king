const express = require('express')
const App = express()
const cors = require('cors')
const recipes = require('./routes/recipe')
const mongooDb = require('./config/register')
const dotenv=require('dotenv').config()
const path =require("path")

// const dotenv=require("dotenv").config() INSTOLL  DOTENV FOR LISTENING PROT
const PORT =  process.env.PORT
// const LAST=process.env.LAST
mongooDb()  

App.use(express.json()) 
App.use(cors())
App.use(express.static('public'))

// App.get("/loging", (req, res) => {
//     res.send(".            .        hello fdf fdf")
//     console.log("jhejld       fj " );
    
// })  
App.use("/recipe", require('./routes/recipe'))  
 App.use('/user', require('./routes/userRoute'))
  
// App.post("/", async (req, res) => {
//     await register.create(req.body)
//         .then(user => res.json(user))
//         .catch(err => res.json(err))
// }) 
/*App.get("/",(req,res)=>{
    App.use(express.static(path.resolve(__dirname,"client","dist")));
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
})*/

App.listen(PORT, () => {
    console.log(`done !", ${PORT}`)
})
