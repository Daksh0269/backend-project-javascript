import { v2 as cloudinary } from 'cloudinary';
import { fs } from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localfile) => {
    //uploading file on cloudinary
    try {
        if (!localfile) return null
        const fileOnCloudinary = await cloudinary.uploader.upload(
            localfile, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file that has been uploaded on cloudinary -->", fileOnCloudinary)
        return fileOnCloudinary;
    } catch (error) {
            fs.unlinkSync(localfile) //remove the locally saved temporary file as the upload operation get's failed

            return null 
    }

}