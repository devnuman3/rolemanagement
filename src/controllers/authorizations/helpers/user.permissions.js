const Permission = require('../../../models/permissions.model');
const User = require('../../../models/user.model');

module.exports.getPermissions=async (req,res,next)=>{
    try{
        const user = await User.findById(req.user_id)

        const userPermissions = await Permission.findById(user.permissionId)

        res.status(200).json({
            message: 'Found',
            data: userPermissions
        })
    }catch (e) {
        console.log('Error',e)
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}