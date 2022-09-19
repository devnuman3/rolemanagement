const User = require('../../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function isLoggedIn(req){
    if(req.headers?.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            return token;
        }
    }
    return false
}

module.exports.login=async (req,res,next)=> {
 try{
   const checkToken = await isLoggedIn(req)
     if(!checkToken) {
         const userEmail = await User.findOne({email: req.body.email});
         if (userEmail) {
             const user = await bcrypt.compare(req.body.password, userEmail.password)
             if (user) {
                 const token = await jwt.sign({ "user_id" : userEmail._id},
                     process.env.JWT_SECRET_TOKEN,
                     {
                         expiresIn: '1h'
                     })

                 res.status(200).json({
                     message: "User Found",
                     data: userEmail,
                     token
                 })
                 next()
             }
             else {
                 res.status(404).json({
                     message: "Incorrect Email Or Password"
                 })
             }
         }else {
             res.status(404).json({
                 message: "Incorrect Email Or Password"
             })
         }

     }else{
         res.status(200).json({
             message:'Already Logged In'
         })
         next()
     }
}catch (e) {
     console.log('Error ', e);
     res.status(501).json({
         message: 'Internal Server Error'
     })
 }
}


module.exports.getUser=async (req,res,next)=>{
    try{
        const checkToken = await isLoggedIn(req);
        if(!checkToken){
            res.status(403).json({
                message: "Login To Continue"
            })
        }
        else {
            jwt.verify(checkToken, process.env.JWT_SECRET_TOKEN,function (err, decoded){
                if (err) {
                    res.status(500).json({
                        message: 'Token Expired Please Login Again'
                    })
                }
                else{
                    req.user_id = decoded.user_id
                    next()
                }
            })
        }
    }catch (e){
        console.log('Error ', e);
        res.status(501).json({
            message: 'Internal Server Error'
        })
    }
}
