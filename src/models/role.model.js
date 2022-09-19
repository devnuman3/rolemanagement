const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    role: {
        type: String,
        default:'user',
    },
    isActive:{              // 0:False 1:Active 2:Block 3:Deleted
        type: Number,
        default: 1,
    }
   
}, { timestamps: true })



module.exports = mongoose.model('role', roleSchema);
