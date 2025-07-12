import express from 'express';
import { listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { uploadImage } from '../utils/uploadImage.js';

const foodRouter = express.Router();


const storage = multer.memoryStorage();
const upload = multer({storage : storage});

foodRouter.post('/add', upload.single("image"), uploadImage);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;

