const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.status(400).json("not found")
    if (await bcrypt.compare(password, user.password)) {
 
        let token = jwt.sign({ email, id: user._id, name: user.name }, "shhhh")
        return res.status(200).json({ token, user })
    }else{
        res.status(400).json("someting went wrong")
    }
}
// res.send("succsess full login")
//  console.log("login here ☺☺")
//  res.send("heho")


const singUp = async (req, res) => {
    let { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Eamil and password not provide " })
    }
    let user = await userModel.findOne({ email })
    if (user) {
        return res.status(400).json({ massage: "exist" })
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {

            let newUser = await userModel.create({
                email, password: hash, name
            })
            const token = jwt.sign({ email, id: newUser._id, name: newUser.name }, "shhhh")
            return res.status(200).json({ token, user: newUser })
        })
    })
    // res.json("it is singup")
}
const getUser = (req, res) => {
    res.send("it is singup")
}

module.exports = { login, singUp, getUser }