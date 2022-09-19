const User = require('../models/user.model');
const bcrypt = require('bcrypt')

module.exports.createUser=async (req,res,next)=>{
    try{
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt)

        const user = await User.create(req.body);
        res.status(201).json({
            message:'User Created Successfully',
            data:user
        })
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.getUser=async (req,res,next)=>{
    try{
        const user_id = req.params.id;
        const user = await User.findById(user_id);
        res.status(200).json({
            message:'Success',
            data:user
        })
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.updateUser=async (req,res,next)=>{
    try{
       const user_id = req.params.id;
        await User.findByIdAndUpdate(user_id,req.body)
        res.status(204).json({
            message:'Updated Successfully'
        })
        
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.deleteUser=async (req,res,next)=>{
    try{
        const user_id = req.params.id;
        await User.findByIdAndUpdate(user_id,{isActive:3})
        res.status(200).json({
            message:'Successfully Deleted'
        })

    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.editProfile=async (req,res,next)=>{
    try{
        if(req.files){
            const {image}=req.files
            const path = '../../../public/images'+image.name
            req.body.image=`/public/images/${image.name}`
        }
        if(req.body?.password){
            const salt = await bcrypt.genSalt(12)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        const user = await User.findByIdAndUpdate(req.user_id,req.body);
        const updateUser = await User.findById(req.user_id)
        res.status(200).json({
            message:'Success',
            data: updateUser
        })
    }catch (e) {
        console.log(e)
    }
}