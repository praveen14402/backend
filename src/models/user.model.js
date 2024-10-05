import mongoose ,{ Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";  

const userScheme = new Schema(
    {
      username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
      },
      email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
   
      },
      fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
      },
      avatar:{ 
        type: String,  // cloudinary url
        required: true,
      },
      coverImage:{
        type: String, // cloudinary url
      },

      watchHistory:[                        // here its gonna store multiple values 
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
      ],

      password:{
        type: String,
        required: [true, "Password is required"],
      },
      refreshToken:{
        type: String
      }
    },
    {
        timestamps: true
    }

)
//  hashing password hooks
userScheme.pre("save", async function(next){
        //check if password is modified
        if(!this.isModified("password")){
            next();
        }
        this.password =  await bcrypt.hash(this.password, 10);
})
 //password verification 
userScheme.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userScheme.methods.generateToken = async function(){
    return jwt.sign({
      _id : this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName
      // payloadnamw  : database name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userScheme.methods.generateRefreshToken = async function(){
    return jwt.sign({
      _id : this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName
      // payloadnamw  : database name
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}


export  const User = mongoose.model("User", userScheme);
