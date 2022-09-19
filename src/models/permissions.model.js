const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({
    permission: [{           // read // create // delete // update
        type: String,
        default:['read'],
    }],
    isActive:{              // 0:False 1:Active 2:Block 3:Deleted
        type: Number,
        default: 1,
    }

}, { timestamps: true })



module.exports = mongoose.model('permissions', permissionSchema);
