const express=require("express")
const router=express.Router()
const {getRecipes,getOneRecipes,editRecipes,deleteRecipes,addRecipes,upload}=require('../controller/controlRecipe')
const verifyToken = require("../middleware/auth")

router.get('/recipes', getRecipes)//get all recipe 
router.post('/create',upload.single('file'), verifyToken, addRecipes)//add the recipes
router.put('/:id',upload.single('file'), editRecipes)//edit the recipes
router.delete('/:id',deleteRecipes)//delete the recipes by his id
router.get('/:id',getOneRecipes)//get recipec by id 

module.exports=router     