import foodModel from "../models/foodModel.js";
import { removeImage } from "../utils/removeImage.js";


// add food item 

const addFood = async (req, res) => {
    console.log("req.body -> ",req.body);
    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        url : req.body.url,
        public_id : req.body.public_id
    })
    try {
        console.log("food object is: ", food);
        await food.save();
        console.log("food item added successfully");
        res.json({
            success : true, 
            message : "Food item added successfully"
        })
    } catch (error) {
        console.error("Failed to add food item: ", error);
        res.json({
            success : false, 
            message : "Failed to add food item"
        })
    }
}

// all food list 
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success : true,
            data : foods
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            message : "Failed to get food list"
        })
    }
}

// remove food items 
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        console.log(food);
        await foodModel.findByIdAndDelete(req.body.id);
        removeImage(food.public_id);
        res.json({
            success : true, 
            message : "Food item removed successfully"
        })
    } catch (error) {
        console.error(error);
        res.json({
            success : false, 
            message : "Failed to remove food item"
        })
    }
}

export {addFood, listFood, removeFood}; 