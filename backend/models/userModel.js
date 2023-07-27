const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name'],
        maxlength:[30, 'name can not exceed 30 characters'],
        minlength:[4,'name should be at least 4 characters']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validator:[validator.isEmail,'please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'please enter the password'],
        minlength:[8,'password should be at least 8 characters'],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },url:{
            type:String,
            required:true
        }

    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

module.exports=mongoose.model('User',userSchema)