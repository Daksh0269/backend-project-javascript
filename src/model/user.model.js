import mongoose , {Schema} from "mongoose"
import { JsonWebTokenError } from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String, // cloudnery url will be stored here 
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    refreshtoken:{
        type:String,
    },
},{timestamps:true})


userSchema.pre("save", async function(next){
    if (this.isModified("password")) {
         this.password = bcrypt.hash(this.password,10)
    next
    }
    next()
   
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.passwrod)

}
userSchema.methods.generateAccessToken = async function(){
    JsonWebTokenError.sign({
        _id:this._id,
        email:this.email,
        username:this.fullname,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.refreshAccessToken = async function(){
      JsonWebTokenError.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User = mongoose.model("User",userSchema)