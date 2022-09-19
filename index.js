require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./src/routes/user.routes')
const roleRouter = require('./src/routes/role.routes')
const permissionRouter = require('./src/routes/permission.routes')
const authRouter = require('./src/routes/auth.routes')
const fileUpload = require('express-fileupload')

const app = express();
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/public/images/'
}));

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Database Connected');
}).catch(err=>{
    console.log('Error ', err);
})

const port = process.env.PORT || 3000
app.use('/api/v1',authRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',roleRouter)
app.use('/api/v1',permissionRouter)

app.listen(port,()=>{
    console.log(`Server Running on Port ${process.env.PORT}`);
})