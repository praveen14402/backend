import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User}  from "../models/user.model.js";
import {uploadOnCloudinar} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
      // get user detail from frontend
      //validation - not empty
      // check if user already exists   : username, email, password
      // check  for images ,check for avatar
      //upload them to cloudinary , avatar
      // create user object - create entry in db
      // remove password and refresh token field from response
      // check for user creation
      // return response

     const { fullName,email,username, password} = req.body;
    // checks whether user gave the fields
     if(
        [fullName,email,username, password].some(
            (field) => field?.trim() === ""
        )
     ){
        throw new ApiError(400, "All fields are required");
     }
     // checking the existed  of user with the current user 
     const existedUser = await User.findOne({
            $or: [{ username }, { email }]
     })
   
     if(existedUser){
        throw new ApiError(409, "User already exists");
     }
     const avatarLocalPath = req.files?.avatar[0]?.path;
   //   const coverImageLocalPath = req.files?.coverImage[0]?.path;

     let coverImageLocalPath;
     if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files?.coverImage[0].path;
     }

     if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
     }
      const avatar = await uploadOnCloudinar(avatarLocalPath);
      const coverImage = await uploadOnCloudinar(coverImageLocalPath);

      if(!avatar){
        throw new ApiError(500, "Something went wrong");
      }

     const  user = await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar : avatar.url,
        coverImage : coverImage?.url || ""
      })
      // checking user created or not , else gonna throw error
       const creaytedUser = await User.findById(user._id).select(
         "-password -refreshToken"
      );

      if(!creaytedUser){   
        throw new ApiError(500, "Something went wrong while registering the user");
      }

      return res.status(201).json(
            new ApiResponse(200, "User created successfully", creaytedUser)
      ) 
})


export {registerUser}