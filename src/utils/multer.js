import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
export const upload = ({ folder }) => {
    //disStroage >>> funcation >>>diskStorage >>> const x= diskSorage({distnation: , filename:})
    //** distnation:string or fun 
    //** filename: fun */
    const storage = diskStorage({
        destination: `uploads/${folder}`, //create folder
        filename: (req, file, cb) => {//save file
            console.log(file);
            //code
            cb(null, nanoid() + "__" + file.originalname); //cb(error ,filename)
            //next
        }
    })
    const fileValidation = {
        image: ['image/png', 'image/jpeg'],
    }
    const fileFilter = (req, file, cd) => {
        /// cb >>> cb(error | null ,true | false//notsave  ) 
        if (!fileValidation.image.includes(file.mimtype)) {
            return cb(new Error("Invalid format!"), false)
        }
        return cb(null, true)
    }

    //multer >>> funcation >>> multer({storage:result of diskstorage})

    const multerUpload = multer({ storage, fileFilter })
    return multerUpload
} 