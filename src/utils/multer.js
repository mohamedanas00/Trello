import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
export const upload = () => {
    //disStroage >>> funcation >>>diskStorage >>> const x= diskSorage({distnation: , filename:})
    //** distnation:string or fun 
    //** filename: fun */
    const storage = diskStorage({
        destination: "uploads", //create folder
        filename: (req, file, cb) => {//save file
            console.log(file);
            //code
            cb(null, nanoid() + "__" + file.originalname); //cb(error ,filename)
        }
    })

    //multer >>> funcation >>> multer({storage:result of diskstorage})

    const multerUpload = multer({ storage })
    return multerUpload
} 
