const Role = require('../../../models/role.model');
const User = require('../../../models/user.model');

module.exports.getRoles=async (req,res,next)=>{
    try{
        const user = await User.findById(req.user_id)
        const userRoles = await Role.findById(user.roleId)
        res.status(200).json({
            message: 'Found',
            data: userRoles
        })
    }catch (e) {
        console.log('Error',e)
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}