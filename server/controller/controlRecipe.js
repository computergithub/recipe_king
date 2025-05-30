const resipesModel = require('../model/recipes')
const multer = require('multer')
const getRecipes = async (req, res) => {
    // console.log("helo") 
    const recipes = await resipesModel.find()
    return res.json(recipes)
}
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/images')

    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })
const addRecipes = async (req, res) => {
    try{

        const { title, ingredients, insturctions, time } = req.body
        if (!title || !ingredients || !insturctions || !time) {
            return res.json("sb vro brna nhi hogo")
        } 
        const recipes = await resipesModel.create({  
            title,
            ingredients,
            insturctions,
            time,  
            coverImage: req.file.filename, 
            createByName: req.user.name,
            createBy: req.user.id,
            createByEmail: req.user.email, 
            // email:req
        })
    }    catch (err) {
        console.log(err)
    }
}

//res.send("fhefhodkjflkfj")

const deleteRecipes = async (req, res) => {
    try {
        await resipesModel.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    } catch (err) {
        console.log(err)
    }
}
const editRecipes = async (req, res) => {
    const { title, ingredients, insturctions, time } = req.body
    const recipe = await resipesModel.findById(req.params.id)

    try {
        if (recipe) {
            let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage
            await resipesModel.findByIdAndUpdate(req.params.id, { ...req.body, coverImage }, { new: true })
            res.json({ title, ingredients, insturctions, time })
        }
    } catch (err) {
        return res.status(404).json({ message: "updation error" })
    }
}
const getOneRecipes = async (req, res) => {
    const recipes = await resipesModel.findById(req.params.id)
    res.json(recipes)
}


module.exports = { getRecipes, getOneRecipes, editRecipes, deleteRecipes, addRecipes, upload }