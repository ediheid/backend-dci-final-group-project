import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "uploads",
    },
    filename: function (req, file, cb) {
        console.log("upload filename function")
        cb(null, uuidv4().slice(0,8)+"." + file.originalname.split(".").pop());
    }
});  

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

let upload = multer({ storage, fileFilter });

export default upload.single('locationImage')