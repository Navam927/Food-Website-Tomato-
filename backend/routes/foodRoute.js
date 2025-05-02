import express from 'express';
import { listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { uploadImage } from '../utils/uploadImage.js';

const foodRouter = express.Router();

// Image storage engine 
// const storage = multer.diskStorage({
//     destination : "uploads",
//     filename : (req, file, cb) => {
//         return cb(null, `${Date.now()}${file.originalname}`);
//     }
// })

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

foodRouter.post('/add', upload.single("image"), uploadImage);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;

