const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const roleController = require('../controllers/role.controller')
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: [true, 'Username is required']
    },
    email:{
        type:String,
        required: [true, 'Email is required']
    },
    password:{
        type:String,
        required: [true, 'Password is required']
    },
    image: {
      type:String,
        default: '../public/img/user.png'
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        default: ObjectId('6328d3983f8ea7176e10a0e3'),
        ref: 'role',
    },
    permissionId:{
        type: mongoose.Types.ObjectId,
        default:ObjectId('6328d5d0a332b0d7a439dd83'),
        ref: 'permissions'
    },
    isActive:{              // 0:False 1:Active 2:Block 3:Deleted
        type: Number,
        default: 1,
    }
}, { timestamps: true })


// userSchema.pre('save',async (req,res,next)=>{
//     console.log(this)
//     // const salt = await bcrypt.genSalt(12);
//     // const hashPassword = await bcrypt.hash(password, salt);
//     // req.body.password = hashPassword;
//
// })

module.exports = mongoose.model('user', userSchema);
