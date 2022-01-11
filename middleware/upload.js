import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

let newID = uuidv4().slice(0,8);
console.log(newID)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, newID+"." + file.originalname.split(".").pop());
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