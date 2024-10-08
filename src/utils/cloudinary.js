import {v2 as cloudinary} from "cloudinary";
import fs from "fs";   // file system



    // Configuration
    
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    




const uploadOnCloudinar = async (localFilePath) => {
    try{
        if(!localFilePath) return null;

       const response =  await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        
        })
        // file uploaded successfully
        // console.log("file uploaded successfully", response.url);
        fs.unlinkSync(localFilePath);
        // remove the locally saved temporary file as the upload operation got successful
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath);
        // remove the locally saved temporary file as the upload operation got failed 
        return null;
    }
}

export {uploadOnCloudinar};