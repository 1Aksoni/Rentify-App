import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

          
cloudinary.config({ 
  cloud_name: 'dhq21bhqr', 
  api_key: '679488171557832', 
  api_secret: '8J-Sv3cAhMIjXHXnSLJsWG5-jhM' 
});

const uploadOnCloudinary =async (localFilePath,targetFolder)=>{
     try {
       
        if(!localFilePath)return null;
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            folder:targetFolder
        });
      //   console.log("file upload on cloudinary",response.url);
        fs.unlinkSync(localFilePath);
        return response;

     } catch (error) {
        //agar koi problem aai to file ko local server se hata denge;
        console.log("cloudinary",error);
        fs.unlinkSync(localFilePath);
        return null;

     }
}

export {uploadOnCloudinary}