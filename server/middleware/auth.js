const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const verifyToken=async (req,res,next)=>{ 
    let token=req.headers['authorization']
    if(token){ 
        token=token.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(400).json({message:"Invalid Token if if"})
            }else{
                req.user=decoded 
                // console.log(decoded)
            }   
        }) 
        next()   
    }else{
        return res.status(400).json({message:"Invalid token if "})
    }
}
module.exports=verifyToken 