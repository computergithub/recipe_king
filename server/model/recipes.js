const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    ingredients: {
        type: Array,
        require: true
    },
    insturctions: {
        type: String,
        require: true
    },
    time: {
        type: String,

    },
    coverImage: {
        type: String,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    createByName: {
        type: String,
    },
    createByEmail:{ 
        type:String,
    }
 

}, { timestamps: true })
module.exports = mongoose.model('recipes', recipeSchema) 