const express = require('express')
const {login,singUp,getUser} = require('../controller/userControll')
const router = express.Router()

router.post("/singUp", singUp)
router.post("/logIn", login)
// router.get("/logIn", login)
router.get("/user/:id", getUser) 
module.exports = router     