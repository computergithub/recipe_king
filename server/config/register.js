const mongoose = require('mongoose')
const mongooDb = async () => {
     await mongoose.connect("mongodb://127.0.0.1:27017/sarkari")
    // console.log("connected....")
}
module.exports = mongooDb