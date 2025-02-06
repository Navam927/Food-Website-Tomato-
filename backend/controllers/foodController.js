import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item 

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    console.log("image filename is ", image_filename);
    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        image : image_filename,
        category : req.body.category
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
            success : ({success : true, data : foods}), 
            
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
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(req.body.id);

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